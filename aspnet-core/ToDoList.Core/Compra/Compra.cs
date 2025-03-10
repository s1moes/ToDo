using Abp.Domain.Entities.Auditing;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ToDoList.Core
{
    public class Compra : FullAuditedEntity<Guid>
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id {  get; set; }
        public required string Produto { get; set; }
        public required bool isChecked { get; set; }
    }
}
