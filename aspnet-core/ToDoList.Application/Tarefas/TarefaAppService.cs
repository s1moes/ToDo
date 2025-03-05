using Abp.UI;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoList.Application.Mappers;
using ToDoList.Application.Tarefas.Dto;
using ToDoList.Core;
using ToDoList.Infrastructure;

namespace ToDoList.Application.Tarefas
{
    public class TarefaAppService : ITarefaAppService
    {
        private readonly IRepository<Tarefa, Guid> _repository;
        private readonly TarefaMapper _tarefaMapper;

        public TarefaAppService
        (
            IRepository<Tarefa, Guid> repository,
            TarefaMapper tarefaMapper
        )
        {
            _repository = repository;
            _tarefaMapper = tarefaMapper;
        }


        public async Task<TarefaDto> CreateAsync(CreateTarefaDto input)
        {
            var tarefa = _tarefaMapper.MapToEntity(input);

            await _repository.InsertAsync(tarefa);

            var tarefaDto = _tarefaMapper.MapToDto(tarefa);

            return tarefaDto;
        }

        public async Task<List<TarefaDto>> GetAllTarefas()
        {
            var tarefas = await _repository.GetAllAsync();
            var listTarefas = _tarefaMapper.MapToDtoList(tarefas);
            return listTarefas;
        }

        public async Task<TarefaDto> GetTarefa(Guid id)
        {
            var tarefa = await _repository.GetByIdAsync(id);
            var tarefaDto = _tarefaMapper.MapToDto(tarefa);

            return tarefaDto;
        }
    }

}
