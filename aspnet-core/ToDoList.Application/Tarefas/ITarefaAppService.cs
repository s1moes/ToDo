using ToDoList.Application.Tarefas.Dto;

namespace ToDoList.Application.Tarefas
{
    public interface ITarefaAppService
    {
        Task<TarefaDto> CreateAsync(CreateTarefaDto input);
        Task<List<TarefaDto>> GetAllTarefas();
        Task<TarefaDto> GetTarefa(Guid id);
    }
}
