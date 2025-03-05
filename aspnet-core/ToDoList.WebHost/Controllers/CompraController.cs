using Microsoft.AspNetCore.Mvc;
using ToDoList.Application.Compras;
using ToDoList.Application.Compras.Dto;

namespace ToDoList.WebHost.Controllers
{
    [Route("api/compra")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly ICompraAppService _compraAppService;

        public CompraController(ICompraAppService compraAppService)
        {
            _compraAppService = compraAppService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateCompraDto input)
        {
            var compra = await _compraAppService.CreateAsync(input);
            if (compra == null) return NotFound();

            return CreatedAtAction(nameof(GetCompras), new { id = compra.Id }, input);
        }

        [HttpGet]
        public async Task<IActionResult> GetCompras()
        {
            var compras = await _compraAppService.GetAllCompras();
            return Ok(compras);
        }
    }
}
