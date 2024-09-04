import { checkSelectAll } from "../action/actionTodo";

export default function TodoSelectAll() {
    return (
        <>
            <div className="toggle-all-container">
                <input type="checkbox" className="toggle-all" onClick={checkSelectAll}/>
                <label htmlFor="toggle-all" className="toggle-all-label">
                    Toggle All Input
                </label>
            </div>
        </>
    );
}