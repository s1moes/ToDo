using Microsoft.AspNetCore.Mvc;
using ToDoList.Application.Tarefas.Dto;
using ToDoList.Application.Tarefas;

namespace ToDoList.WebHost.Controllers
{
    [Route("api/tarefa")]
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefaAppService _tarefaAppService;

        public TarefaController(ITarefaAppService tarefaAppService)
        {
            _tarefaAppService = tarefaAppService;
        }

        
    }
}
