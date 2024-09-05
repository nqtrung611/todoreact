import { clearCompleted, filterTodo } from "../action/actionTodo";

export default function TodoFooter() {
    return (
        <>
          <footer className="footer">
            <span className="todo-count">3 items left</span>
            <div className="filters">
              <button className="btn-option selected" value="all" onClick={filterTodo}>All</button>
              <button className="btn-option" value="completed" onClick={filterTodo}>Completed</button>
              <button className="btn-option" value="incomplete" onClick={filterTodo}>Active</button>
            </div>
            <button type="button" className="clear-completed" onClick={clearCompleted}> Clear Completed </button>
          </footer>
        </>
    );
}