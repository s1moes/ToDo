function addTaskToUserInterface(id) {
    const ulTaskList = document.querySelector('.task-list');
    const taskStats = document.querySelector('.task-stats'); 

    ulTaskList.innerHTML = '';

    if (taskList.length == 0) {
        ulTaskList.innerHTML = '<span>Não existe tarefas</span>';
        taskStats.innerHTML = '<span>0 tarefas totais</span>';
        return;
    }

    taskList.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.state) {
            li.classList.add('done');
        }
        
        if (task.new) {
            li.id = id;
        } else {
            li.id = task.id;
        }

        li.innerHTML = `
            <span class="task-text">${task.task}</span>
            <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
            <div class="task-actions">
                <button class="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn-delete" onclick="deleteTask(${task.new ? id : task.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        ulTaskList.appendChild(li);
        
        const doneTasks = taskList.filter(task => task.state === done);
        const pendingTasks = taskList.filter(task => task.state !== done);

        taskStats.innerHTML = `<span>${taskList.length} tarefas totais</span>
                    <span>${doneTasks.length} concluída, ${pendingTasks.length} pendentes</span>`;
    });
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    addTaskToUserInterface();
}