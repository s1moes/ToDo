using Microsoft.EntityFrameworkCore;
using ToDoList.Core;

namespace ToDoList.Infrastructure.Data
{
    public class ApplicationDataContext : DbContext
    {
        public DbSet<Tarefa> Tarefa { get; set; }
        public DbSet<Compra> Compra { get; set; }

        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options)
            : base(options)
        {
        }
    }

}
