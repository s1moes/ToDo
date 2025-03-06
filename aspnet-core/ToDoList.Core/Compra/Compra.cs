using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.Core
{
    [Table("Compra")]
    public class Compra : FullAuditedEntity<Guid>
    {
        public string Produto { get; set; }
        public bool isChecked { get; set; }
    }
}
