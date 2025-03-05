using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Infrastructure
{
    public interface IRepository<T, TKey> where T : class
    {
        Task<TKey> InsertAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<T> GetByIdAsync(TKey id);
        Task<List<T>> GetAllAsync();
    }

}
