document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const deleteAllButton = document.getElementById('delete-all');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (taskName) {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <div class="task-details">
                    <span class="task-name">${taskName}</span>
                    <span class="task-meta">Due: ${dueDate} | Priority: ${priority}</span>
                </div>
                <div class="task-actions">
                    <input type="checkbox" class="complete-checkbox">
                    <button class="delete-button"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            newTask.classList.add(priority.toLowerCase() + '-priority');
            todoList.appendChild(newTask);
            taskNameInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'Low';
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button') || e.target.parentElement.classList.contains('delete-button')) {
            const taskToRemove = e.target.closest('li');
            todoList.removeChild(taskToRemove);
        } else if (e.target.classList.contains('complete-checkbox')) {
            const taskToComplete = e.target.closest('li');
            taskToComplete.classList.toggle('completed');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.id);
        });
    });

    deleteAllButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all tasks?')) {
            while (todoList.firstChild) {
                todoList.removeChild(todoList.firstChild);
            }
        }
    });

    function filterTasks(filter) {
        const tasks = todoList.childNodes;
        tasks.forEach(task => {
            switch (filter) {
                case 'all-tasks':
                    task.style.display = 'flex';
                    break;
                case 'complete-tasks':
                    if (task.classList.contains('completed')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'incomplete-tasks':
                    if (!task.classList.contains('completed')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'low-priority-tasks':
                    if (task.classList.contains('low-priority')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'high-priority-tasks':
                    if (task.classList.contains('high-priority')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
            }
        });
    }
});
