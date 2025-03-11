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
            return (TKey)entity.GetType().GetProperty("MongoId")?.GetValue(entity);
        }

        public async Task<T> GetByIdAsync(TKey id)
        {
            var filter = Builders<T>.Filter.Eq("_id", id.ToString()); // Buscar pelo ObjectId
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            var id = entity.GetType().GetProperty("MongoId")?.GetValue(entity);
            var filter = Builders<T>.Filter.Eq("_id", id);
            await _collection.ReplaceOneAsync(filter, entity);
        }

        public async Task DeleteAsync(T entity)
        {
            var id = entity.GetType().GetProperty("MongoId")?.GetValue(entity);
            var filter = Builders<T>.Filter.Eq("_id", id);
            await _collection.DeleteOneAsync(filter);
        }

    }

}
