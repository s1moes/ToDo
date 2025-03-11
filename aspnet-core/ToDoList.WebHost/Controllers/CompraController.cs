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

        // POST: api/compra
        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateCompraDto input)
        {
            var compra = await _compraAppService.CreateAsync(input);
            if (compra == null) return NotFound();  

            return Ok(compra);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompras()
        {
            var compras = await _compraAppService.GetAllComprasAsync();
            
            if (compras == null || compras.Count == 0) return NotFound();

            return Ok(compras);
        }
    }
}
