const form = document.getElementById('form');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault();
    
    const taskValue = document.getElementById('task').value;

    if (taskValue === '') {
        Swal.fire("Please, enter a task before adding!");
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    taskText.style.color = 'black';
    taskText.style.fontSize = '24px';


    checkbox.addEventListener('change', () => {
        toggleTaskCompletion(taskText, checkbox);
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    document.getElementById('task').value = '';

    saveTasks();
}

function toggleTaskCompletion(taskText, checkbox) {
    if (checkbox.checked) {
        taskText.classList.add('checked');
    } else {
        taskText.classList.remove('checked');
    }
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(taskItem => {
        const task = {
            text: taskItem.querySelector('span').textContent,
            checked: taskItem.querySelector('input').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.style.color = 'black';
        taskText.style.fontSize = '24px';
        if (task.checked) {
            taskText.classList.add('checked');
        }

        

        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(taskText, checkbox);
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

const adj = ['optimistic!', 'organized!', 'hard-driven!', 'happy!'];
let adjIndex = 0;
let charIndex = 0;
const autoText = document.querySelector('.auto-text');

function updateText() {
    charIndex++;
    autoText.textContent = adj[adjIndex].slice(0, charIndex);
    if (charIndex === adj[adjIndex].length) {
        adjIndex = (adjIndex + 1) % adj.length;
        charIndex = 0;
    }
    setTimeout(updateText, 400);
}

updateText();