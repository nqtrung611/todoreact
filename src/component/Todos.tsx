import { useEffect } from "react";
import { onComplete, onDelete, onEdit, renderTask, showClearCompleted, showFooter, showItemsLeft, showSelectAll } from "../action/actionTodo";

export default function Todos () {
    useEffect(() => {
        const listTasks = document.querySelector(".todo-list");
        const Todo_user = localStorage.getItem('Todo_user');
        if (!Todo_user) {
            localStorage.setItem('Todo_user','{}');
        }
        const tasks = JSON.parse(Todo_user as string);
        const fragment = document.createDocumentFragment();
        for (const index in tasks) {
            let itemTask = renderTask(index, tasks[index]);
            if (tasks[index].completed) {
                itemTask.classList.add("completed");
            }
            fragment.appendChild(itemTask);
        }
        listTasks?.appendChild(fragment);
        showItemsLeft();
        showSelectAll();
        showFooter();
        showClearCompleted();
    });
    const actionTask = (e: any) => {
        if (e.target.tagName === 'IMG') {
            onComplete(e.target);
        }
        if (e.target.tagName === 'BUTTON') {
            onDelete(e.target);
        }
    };
    const editTask = (e: any) => {
        if (e.target.tagName === 'LABEL') {
            onEdit(e.target);
            // console.log(e.target);
        }
    };
    return (
        <>
            <ul className="todo-list" onClick={actionTask} onDoubleClick={editTask}>
            </ul>
        </>
    )
}
