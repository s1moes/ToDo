using AutoMapper;
using ToDoList.Core;

namespace ToDoList.Application.Compras.Dto
{
    public class CompraMapProfile : Profile
    {
        public CompraMapProfile() 
        {
            CreateMap<CreateCompraDto, Compra>();

            CreateMap<Compra, CompraDto>();
        }
    }
}
