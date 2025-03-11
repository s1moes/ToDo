using Abp.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ToDoList.Core
{
    public class Compra
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        public string Produto { get; set; }
        public bool isChecked { get; set; }
    }
}
