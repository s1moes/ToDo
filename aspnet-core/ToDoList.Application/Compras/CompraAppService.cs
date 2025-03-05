using ToDoList.Application.Compras.Dto;
using ToDoList.Core;
using ToDoList.Infrastructure;

namespace ToDoList.Application.Compras
{
    public class CompraAppService : ICompraAppService
    {
        private readonly IRepository<Compra, Guid> _repository;
        private readonly CompraMapper _compraMapper;

        public CompraAppService
        (
            IRepository<Compra, Guid> repository,
            CompraMapper compraMapper
        )
        {
            _repository = repository;
            _compraMapper = compraMapper;
        }


        public async Task<CompraDto> CreateAsync(CreateCompraDto input)
        {
            var compra = _compraMapper.MapToEntity(input);

            await _repository.InsertAsync(compra);

            var compraDto = _compraMapper.MapToDto(compra);

            return compraDto;
        }

        public async Task<List<CompraDto>> GetAllCompras()
        {
            var compras = await _repository.GetAllAsync();
            var listCompras = _compraMapper.MapToDtoList(compras);
            return listCompras;
        }
    }

}
