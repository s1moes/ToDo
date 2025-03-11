using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Infrastructure
{
    public interface IMongoRepository<T, TKey> where T : class
    {
        Task<TKey> InsertAsync(T entity);

        Task<List<T>> GetAllAsync();
    }

}
