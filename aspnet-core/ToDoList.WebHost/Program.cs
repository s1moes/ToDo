using ToDoList.Infrastructure.Data;
using ToDoList.Application.Tarefas;
using Microsoft.EntityFrameworkCore;
using ToDoList.Infrastructure;
using ToDoList.Core;
using ToDoList.Application.Compras;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDataContext>(options =>
    options.UseInMemoryDatabase("DatabaseTeste"));

builder.Services.AddScoped<ITarefaAppService, TarefaAppService>();
builder.Services.AddScoped<IRepository<Tarefa, Guid>, Repository<Tarefa, Guid>>();
builder.Services.AddScoped<TarefaMapper, TarefaMapper>();

builder.Services.AddScoped<ICompraAppService, CompraAppService>();
builder.Services.AddScoped<IRepository<Compra, Guid>, Repository<Compra, Guid>>();
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