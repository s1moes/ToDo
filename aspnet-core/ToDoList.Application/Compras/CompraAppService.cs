using Abp.Application.Services;
using ToDoList.Application.Compras.Dto;
using ToDoList.Application.Compras;
using ToDoList.Core;
using ToDoList.Infrastructure;
using MongoDB.Bson.Serialization;

public class CompraAppService : ApplicationService, ICompraAppService
{
    private readonly IMongoRepository<Compra, Guid> _compraRepository; // Use Guid as the type for the repository
    private readonly CompraMapper _compraMapper;

    public CompraAppService(IMongoRepository<Compra, Guid> compraRepository, CompraMapper compraMapper)
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

        // Ensure the ID is set to a new Guid
        compra.Id = Guid.NewGuid();

        await _compraRepository.InsertAsync(compra);
        return _compraMapper.MapToDto(compra);
    }

    public async Task<List<CompraDto>> GetAllComprasAsync()
    {
        // Se o repositório retorna BsonDocument, mapeie para Compra primeiro
        var comprasBson = await _compraRepository.GetAllAsync();
        // var compras = comprasBson.Select(bson => BsonSerializer.Deserialize<Compra>(bson.ToString())).ToList();

        // Mapeia para CompraDto
        return comprasBson.Select(compra => _compraMapper.MapToDto(compra)).ToList();
    }


}
