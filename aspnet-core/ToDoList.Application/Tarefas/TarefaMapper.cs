namespace ToDoList.Application.Tarefas
{
    using ToDoList.Application.Mappers;
    using ToDoList.Application.Tarefas.Dto;
    using ToDoList.Core;

    // Implementação específica para Tarefa
    public class TarefaMapper : ObjectMapper<Tarefa, TarefaDto, CreateTarefaDto>
    {
        // Implementação de mapeamento de DTO para Entidade Tarefa
        public override Tarefa MapToEntity(CreateTarefaDto dto)
        {
            return new Tarefa
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Concluida = dto.Concluida,
                DataConclusao = dto.DataConclusao
            };
        }

        // Implementação de mapeamento de Entidade Tarefa para DTO
        public override TarefaDto MapToDto(Tarefa entity)
        {
            return new TarefaDto
            {
                Id = entity.Id,
                Titulo = entity.Titulo,
                Descricao = entity.Descricao,
                DataConclusao = entity.DataConclusao
            };
        }

        public override List<TarefaDto> MapToDtoList(List<Tarefa> tarefas)
        {
            var dtoList = new List<TarefaDto>();
            foreach (var tarefa in tarefas)
            {
                dtoList.Add(MapToDto(tarefa));
            }
            return dtoList;
        }
    }
}
