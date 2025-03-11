using Abp.Domain.Entities.Auditing;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ToDoList.Core
{
    public class Compra : FullAuditedEntity<Guid>
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string MongoId { get; set; } = ObjectId.GenerateNewId().ToString(); // Identificador do MongoDB

        public required string Produto { get; set; }
        public required bool isChecked { get; set; }

        [BsonIgnore] // Evita conflito com o MongoDB
        public override Guid Id { get; set; } = Guid.NewGuid();
    }
}
