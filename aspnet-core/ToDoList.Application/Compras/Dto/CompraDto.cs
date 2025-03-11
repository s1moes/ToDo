using Abp.Application.Services.Dto;

namespace ToDoList.Application.Compras.Dto
{
    public class CompraDto : AuditedEntityDto<Guid>
    {

        public Guid Id { get; set; }
        public string Produto { get; set; }
        public bool isChecked { get; set; }
    }
}
