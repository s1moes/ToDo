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

        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateTarefaDto input)
        {
            var tarefa = await _tarefaAppService.CreateAsync(input);
            if (tarefa == null) return NotFound();

            return CreatedAtAction(nameof(GetTarefa), new { id = tarefa.Id }, input);
        }

        [HttpGet]
        public async Task<IActionResult> GetTarefas()
        {
            var tarefas = await _tarefaAppService.GetAllTarefas();
            return Ok(tarefas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTarefa(Guid id)
        {
            var tarefa = await _tarefaAppService.GetTarefa(id);
            if (tarefa == null) return NotFound();

            return Ok(tarefa);
        }
    }
}
