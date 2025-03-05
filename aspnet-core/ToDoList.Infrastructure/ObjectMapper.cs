namespace ToDoList.Application.Mappers
{
    using System;
    using System.Collections.Generic;

    // Definimos uma interface genérica
    public interface IObjectMapper<TEntity, TDto, TDto1>
    {
        TEntity MapToEntity(TDto1 dto);
        TDto MapToDto(TEntity entity);
        List<TDto> MapToDtoList(List<TEntity> entities);
    }

    // Implementação genérica da interface
    public abstract class ObjectMapper<TEntity, TDto, TDto1> : IObjectMapper<TEntity, TDto, TDto1>
    {
        // Método abstrato para mapear DTO para Entidade
        public abstract TEntity MapToEntity(TDto1 dto);

        // Método abstrato para mapear Entidade para DTO
        public abstract TDto MapToDto(TEntity entity);

        // Mapeamento genérico de uma lista de entidades para uma lista de DTOs
        public abstract List<TDto> MapToDtoList(List<TEntity> entities);
    }
}

