import { useEffect } from "react";
import { renderTask, showItemsLeft } from "../action/actionTodo";

export default function Todos () {
    // useEffect(() => {
    //     const listTasks = document.querySelector(".todo-list");
    //     const Todo_user = localStorage.getItem('Todo_user');
    //     if (!Todo_user) {
    //         localStorage.setItem('Todo_user','{}');
    //     }
    //     const tasks = JSON.parse(Todo_user as string);
    //     const fragment = document.createDocumentFragment();
    //     for (const index in tasks) {
    //         let itemTask = renderTask(index, tasks[index]);
    //         if (tasks[index].completed) {
    //             itemTask.classList.add("completed");
    //         }
    //         fragment.appendChild(itemTask);
    //     }
    //     listTasks?.appendChild(fragment);
    //     showItemsLeft();
    // });
    return (
        <>
            <ul className="todo-list">
                {/* {tasks.map((task) => (
                    <li className="task view"> */}
                        {/* <CompletedForm id={task.id}/> */}
                        {/* <label>{task.text}</label>
                        <input type="text" style={{display: 'none'}}/> */}
                        {/* <DeleteForm id={task.id}/> */}
                    {/* </li>
                ))} */}
            </ul>
        </>
    )
}
