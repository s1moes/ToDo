using Abp.Application.Services.Dto;

namespace ToDoList.Application.Compras.Dto
{
    public class CompraDto : AuditedEntityDto<Guid>
    {
        public string Produto { get; set; }
    }
}
