using ToDoList.Application.Compras.Dto;
using ToDoList.Core;
using ToDoList.Infrastructure;

namespace ToDoList.Application.Compras
{
    public class CompraAppService : ICompraAppService
    {
        private readonly IMongoRepository<Compra, Guid> _mongoRepository;
        private readonly CompraMapper _compraMapper;

        public CompraAppService
        (
            IMongoRepository<Compra, Guid> mongoRepository,
            CompraMapper compraMapper
        )
        {
            _mongoRepository = mongoRepository;
            _compraMapper = compraMapper;
        }


        public async Task<CompraDto> CreateAsync(CreateCompraDto input)
        {
            var compra = _compraMapper.MapToEntity(input);

            await _mongoRepository.InsertAsync(compra);

            var compraDto = _compraMapper.MapToDto(compra);

            return compraDto;
        }

        public async Task<List<CompraDto>> GetAllCompras()
        {
            var compras = await _mongoRepository.GetAllAsync();
            var listCompras = _compraMapper.MapToDtoList(compras);
            return listCompras;
        }
    }

}
