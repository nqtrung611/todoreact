import { addNewTask } from "../action/actionTodo";

export default function TodoForm() {
    return (
        <>
            <h1>Todos</h1>
            <input
                className="todo-input"
                type="text"
                id="input-box"
                name="content"
                placeholder="Nhập công việc tại đây"
                autoFocus
                required
                onKeyDown={addNewTask}
            />
        </>
    )
}
