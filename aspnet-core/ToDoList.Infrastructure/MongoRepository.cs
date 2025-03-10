using MongoDB.Bson;
using MongoDB.Driver;
using ToDoList.Infrastructure.Data;

namespace ToDoList.Infrastructure
{
    public class MongoRepository<T, TKey> : IMongoRepository<T, TKey> where T : class
    {
        private readonly IMongoCollection<T> _collection;

        public MongoRepository(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<TKey> InsertAsync(T entity)
        {
            await _collection.InsertOneAsync(entity);
            return (TKey)entity.GetType().GetProperty("Id")?.GetValue(entity);
        }

        public async Task UpdateAsync(T entity)
        {
            var id = entity.GetType().GetProperty("Id")?.GetValue(entity);
            var filter = Builders<T>.Filter.Eq("id", id);
            await _collection.ReplaceOneAsync(filter, entity);
        }

        public async Task DeleteAsync(T entity)
        {
            var id = entity.GetType().GetProperty("Id")?.GetValue(entity);
            var filter = Builders<T>.Filter?.Eq("Id", id);
            await _collection.DeleteOneAsync(filter);
        }

        public async Task<T> GetByIdAsync(TKey id)
        {
            var filter = Builders<T>.Filter.Eq("Id", id);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _collection.Find(Builders<T>.Filter.Empty).ToListAsync();
        }
    }

}
