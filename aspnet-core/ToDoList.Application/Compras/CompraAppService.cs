using Abp.Application.Services;
using ToDoList.Application.Compras.Dto;
using ToDoList.Core;
using ToDoList.Infrastructure;

namespace ToDoList.Application.Compras
{
    public class CompraAppService : ApplicationService, ICompraAppService
    {
        private readonly IMongoRepository<Compra, string> _compraRepository;
        private readonly CompraMapper _compraMapper;

        public CompraAppService(IMongoRepository<Compra, string> compraRepository, CompraMapper compraMapper)
        {
            _compraRepository = compraRepository;
            _compraMapper = compraMapper;
        }

        public async Task<CompraDto> CreateAsync(CreateCompraDto input)
        {
            var compra = new Compra
            {
                Produto = input.Produto,
                isChecked = input.isChecked
            };

            await _compraRepository.InsertAsync(compra);
            return _compraMapper.MapToDto(compra);
        }

        public async Task<CompraDto> GetByIdAsync(Guid id)
        {
            var compra = await _compraRepository.GetByIdAsync(id.ToString());
            return _compraMapper.MapToDto(compra);
        }

        public async Task<List<CompraDto>> GetAllCompras()
        {
            var compras = await _compraRepository.GetAllAsync();
            return _compraMapper.MapToDtoList(compras);
        }
    }


}
