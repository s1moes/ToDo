namespace ToDoList.Application.Tarefas.Dto
{
    public class CreateTarefaDto
    {
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public bool Concluida { get; set; }
        public DateTime? DataConclusao { get; set; }
    }
}
