using AutoMapper;
using ToDoList.Core;

namespace ToDoList.Application.Tarefas.Dto
{
    public class TarefaMapProfile : Profile
    {
        public TarefaMapProfile() 
        {
            CreateMap<CreateTarefaDto, Tarefa>()
                .ForMember(x => x.Titulo, opt => opt.Ignore())
                .ForMember(x => x.Descricao, opt => opt.Ignore())
                .ForMember(x => x.Concluida, opt => opt.Ignore());
        }
    }
}
