// In MongoRepository
using MongoDB.Bson;
using MongoDB.Driver;
using ToDoList.Infrastructure;

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

    public async Task<List<T>> GetAllAsync()
    {
        return await _collection.Find(FilterDefinition<T>.Empty).ToListAsync();
    }




}
