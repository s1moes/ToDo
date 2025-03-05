using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoList.Infrastructure.Data;

namespace ToDoList.Infrastructure
{
    public class Repository<T, TKey> : IRepository<T, TKey> where T : class
    {
        private readonly ApplicationDataContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(ApplicationDataContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<TKey> InsertAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            // Supondo que a entidade tenha uma propriedade 'Id' do tipo TKey
            return (TKey)entity.GetType().GetProperty("Id")?.GetValue(entity);
        }

        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<T> GetByIdAsync(TKey id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
    }

}
