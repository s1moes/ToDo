using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.Core
{
    [Table("Tarefa")]
    public class Tarefa : FullAuditedEntity<Guid>
    {
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public bool? Concluida { get; set; }
        public DateTime? DataConclusao { get; set; }
    }
}
