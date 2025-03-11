namespace ToDoList.Application.Compras
{
    using ToDoList.Application.Mappers;
    using ToDoList.Application.Compras.Dto;
    using ToDoList.Core;

    // Implementação específica para Tarefa
    public class CompraMapper : ObjectMapper<Compra, CompraDto, CreateCompraDto>
    {
        // Implementação de mapeamento de DTO para Entidade Tarefa
        public override Compra MapToEntity(CreateCompraDto dto)
        {
            return new Compra
            {
                Produto = dto.Produto,
                isChecked = dto.isChecked
            };
        }

        // Implementação de mapeamento de Entidade Tarefa para DTO
        public override CompraDto MapToDto(Compra compra)
        {
            return new CompraDto
            {
                Id = compra.Id,
                Produto = compra.Produto,
                isChecked = compra.isChecked
            };
        }


        public override List<CompraDto> MapToDtoList(List<Compra> compras)
        {
            var dtoList = new List<CompraDto>();
            foreach (var compra in compras)
            {
                dtoList.Add(MapToDto(compra));
            }
            return dtoList;
        }
    }
}
