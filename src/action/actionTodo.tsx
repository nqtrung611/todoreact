import { KeyboardEvent } from 'react';

export function generateRandomId(length: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

const ENUM_TYPE = {
    NEW: 'new',
    EDIT: 'edit',
    DELETE: 'delete',
    COMPLETE: 'complete'
}
const ENUM_TAB = {
    ALL: 'all',
    COMPLETED: 'completed',
    INCOMPLETE: 'incomplete'
}

export const addHTML = (taskValue: any) => {
    <>
        <img alt="" onClick={onComplete}/>
        <label>{taskValue.text}</label>
        <button className="delete">X</button>
        <input type="text" style={{display: 'none'}}/>  
    </>
};

//Render task
export const renderTask = (index: string, taskValue: any) => {
    let innerTask = document.createElement("li");
    innerTask.classList.add("task");
    innerTask.classList.add("view");
    innerTask.setAttribute("id",index);
    innerTask.innerHTML = `
        <img alt="" class="taskImg">
        <label>${taskValue.text}</label>
        <button class="delete">X</button>
        <input type="text" style="display: none">
    `;
    return innerTask;
}

//Create new task
export const createNewTask = (index: string, taskValue: any) => {
    const listTasks = document.querySelector(".todo-list");
    let innerTask = renderTask(index, taskValue);
    const btnSelected = document.querySelector("button.selected") as HTMLButtonElement;
    if (btnSelected.value === 'completed') {
        innerTask.style.display = 'none';
    }
    listTasks?.appendChild(innerTask);
};

//Thêm mới, cập nhật task vào local storage
export const addNewTask = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        const newTaskInput = document.querySelector("input.todo-input") as HTMLInputElement;
        if (newTaskInput) {
            if (newTaskInput.value.trim() === '') {
                alert("Vui lòng nhập công việc");
                newTaskInput.value = "";
                return;
            }
            const taskId = generateRandomId(10);
            updateStorage(taskId, newTaskInput.value.trim(), ENUM_TYPE.NEW);
            createNewTask(taskId, {text: newTaskInput.value.trim(), completed: false});
            newTaskInput.value = "";
            showFooter();
            showItemsLeft();
            showSelectAll();
        }
    }
};

//Delete, Complete, Edit, New task ở Local Storage
export const updateStorage = (index: string, text: string, type: any) => {
    const Todo_user = localStorage.getItem('Todo_user');
    const todoData = JSON.parse(Todo_user as string);
    switch(type) {
        case ENUM_TYPE.DELETE: //Xóa Task
            delete todoData[index];
            break;
        case ENUM_TYPE.COMPLETE: //Complete Task
            todoData[index].completed = !Boolean(todoData[index].completed);
            break;
        case ENUM_TYPE.NEW: //New Task
            todoData[index] = {text: text, completed: false};
            break;
        case ENUM_TYPE.EDIT: //Edit Task
            todoData[index].text = text;
            break;
    }
    localStorage.setItem('Todo_user', JSON.stringify(todoData));
};

//Show item left
export function showItemsLeft() {
    const itemsLeft = document.querySelector(".todo-count") as HTMLParagraphElement;
    const tasksInComplete = document.querySelectorAll('.task:not(.completed)');
    itemsLeft.innerText = (tasksInComplete.length < 2) ? `${tasksInComplete.length} item left` : `${tasksInComplete.length} items left`;
}

//Show Clear Completed
export function showClearCompleted() {
    const clearBtn = document.querySelector(".clear-completed") as HTMLButtonElement;
    const tasksCompleted = document.querySelectorAll(".task.completed");
    clearBtn.style.display = (tasksCompleted.length) ? 'inline-block' : 'none';
}

//Show footer
export function showFooter() {
    const footer = document.querySelector(".footer") as HTMLElement;
    const tasks = document.querySelectorAll(".task");
    footer.style.display = (!tasks.length) ? 'none' : 'block';
}

//Check Select All
export function checkSelectAll() {
    const noop = () => {};
    const label = document.querySelector('label.toggle-all-label') as HTMLElement;
    if (label) {
        if (label.style.display === "none") {
            noop();
            return;
        }
    }
    selectAll();
}

//Show Select All và in đậm
export function showSelectAll() {
    const tasks = document.querySelectorAll(".task");
    const tasksCompleted = document.querySelectorAll(".task.completed");
    const tasksInComplete = document.querySelectorAll('.task:not(.completed)');
    const btnSelected = document.querySelector("button.selected") as HTMLButtonElement;
    const label = document.querySelector('label.toggle-all-label') as HTMLElement;
    if (label) {
        (tasksInComplete.length === 0) ? label.classList.add("active") : label.classList.remove("active");
        if (tasks.length === 0) {
            label.style.display = "none";
            return;
        }
        switch(btnSelected.value) {
            case ENUM_TAB.ALL:
                label.style.display = "flex";
                break;
            case ENUM_TAB.COMPLETED:
                label.style.display = (tasksCompleted.length === 0) ? 'none' : 'flex';
                break;
            case ENUM_TAB.INCOMPLETE:
                label.style.display = (tasksInComplete.length === 0) ? 'none' : 'flex';
                break;
        }

    }
}

//Button select task (Tất cả, hoàn thành, chưa hoàn thành)
export function filterTodo(e: any) {
    const tasks = document.querySelectorAll(".task");
    const btnSelected = document.querySelector("button.selected") as HTMLButtonElement;
    btnSelected?.classList.remove("selected");
    e.target.classList.add("selected");
    if (tasks) {
        tasks.forEach(function(task) {
            switch(e.target.value) {
                case ENUM_TAB.ALL:
                    (task as HTMLElement).style.display = "flex";
                    break;
                case ENUM_TAB.COMPLETED:
                    (task as HTMLElement).style.display = (task.classList.contains("completed")) ? 'flex' : 'none';
                    break;
                case ENUM_TAB.INCOMPLETE:
                    (task as HTMLElement).style.display = (!task.classList.contains("completed")) ? 'flex' : 'none';
                    break;
            }
        });
    }
    showSelectAll();
}

//Select All
export function selectAll() {
    const tasks = document.querySelectorAll(".task");
    const tasksInComplete = document.querySelectorAll('.task:not(.completed)');
    if (tasksInComplete.length === 0) {
        tasks.forEach(function(task) {
            task.classList.remove("completed");
            updateStorage(task.id, '', ENUM_TYPE.COMPLETE);
        });
    } else {
        tasksInComplete.forEach(function(taskInComplete) {
            taskInComplete.classList.add("completed");
            updateStorage(taskInComplete.id, '', ENUM_TYPE.COMPLETE);
        });
    }
    const btnSelected = document.querySelector("button.selected") as HTMLButtonElement;
    tasks.forEach(function(task) {
        switch(btnSelected.value) {
            case ENUM_TAB.ALL:
                (task as HTMLElement).style.display = "flex";
                break;
            case ENUM_TAB.COMPLETED:
                (task as HTMLElement).style.display = (task.classList.contains("completed")) ? 'flex' : 'none';
                break;
            case ENUM_TAB.INCOMPLETE:
                (task as HTMLElement).style.display = (!task.classList.contains("completed")) ? 'flex' : 'none';
                break;
        }
    });
    showClearCompleted();
    showItemsLeft();
    showSelectAll();

}

// //Click Complete task
export function onComplete(e: any) {
    const taskId = e.parentElement.id;
    updateStorage(taskId, '', ENUM_TYPE.COMPLETE);
    const btnSelected = document.querySelector("button.selected") as HTMLButtonElement;
    e.parentElement.classList.toggle("completed");
    if (btnSelected.value === ENUM_TAB.COMPLETED) {
        e.parentElement.style.display = (e.parentElement.classList.contains("completed")) ? 'flex' : 'none';
    }
    if (btnSelected.value === ENUM_TAB.INCOMPLETE) {
        e.parentElement.style.display = (!e.parentElement.classList.contains("completed")) ? 'flex' : 'none';
    }
    showItemsLeft();
    showSelectAll();
    showClearCompleted();
}

//Click Delete task
export function onDelete(e: any) {
    const taskId = e.parentElement.id;
    const taskDelete = document.querySelector(`#${taskId}`);
    taskDelete?.parentNode?.removeChild(taskDelete);
    updateStorage(taskId, '', ENUM_TYPE.DELETE);
    showItemsLeft();
    showSelectAll();
    showFooter();
    showClearCompleted();
}

//Click Clear Completed
export function clearCompleted() {
    const tasksCompleted = document.querySelectorAll(".task.completed");
    tasksCompleted.forEach(function(taskCompleted) {
        updateStorage(taskCompleted.id, '', ENUM_TYPE.DELETE);
        taskCompleted?.parentNode?.removeChild(taskCompleted);
    });
    // e.style.display = 'none';
    showSelectAll();
    showFooter();
}

//Edit task
export function onEdit(e: any) {
    e.parentElement.classList.remove("view");
    e.parentElement.querySelector("img").style.display = "none";
    const inputElement = e.parentElement.querySelector("input");
    inputElement.style.display = "inline-block";
    inputElement.focus();
    inputElement.value = e.textContent;
    e.style.display = "none";
    inputElement.addEventListener('keydown', function(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            showTaskAgain(e, inputElement);
        }
        if (event.key === 'Enter') {
            if (inputElement.value.trim() === '') {
                alert("Vui lòng nhập công việc");
            } else {
                showTaskAgain(e, inputElement);
                e.innerText = inputElement.value.trim();
                updateStorage(e.parentElement.id, inputElement.value.trim(), ENUM_TYPE.EDIT);
            }
        }
    });
    inputElement.addEventListener('blur', function() {
        showTaskAgain(e, inputElement);
    });
}

// //Show task sau khi chỉnh sửa
export function showTaskAgain(e: any, inputElement: any) {
    e.parentElement.querySelector("img").style.display = "block";
    e.style.display = "block";
    inputElement.style.display = "none";
    e.parentElement.classList.add("view");
}
