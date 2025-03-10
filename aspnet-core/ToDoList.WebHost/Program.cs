using ToDoList.Infrastructure.Data;
using ToDoList.Application.Tarefas;
using Microsoft.EntityFrameworkCore;
using ToDoList.Infrastructure;
using ToDoList.Core;
using ToDoList.Application.Compras;
using MongoDB.Driver;
using Abp.Domain.Repositories;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DbConnection");
var mongoClient = new MongoClient(connectionString);
var dataBaseName = "ToDo";
var dataBase = mongoClient.GetDatabase(dataBaseName);

builder.Services.AddSingleton<IMongoClient>(mongoClient);
builder.Services.AddSingleton<IMongoDatabase>(dataBase);

builder.Services.AddScoped<IMongoRepository<Compra, Guid>>(provider =>
    new MongoRepository<Compra, Guid>(dataBase, "Compras"));

builder.Services.AddScoped<ICompraAppService, CompraAppService>();
builder.Services.AddScoped<CompraMapper, CompraMapper>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5500")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();