import { useMemo, useState } from "react";
import TaskItem from "./components/TaskItem";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const completedCount = useMemo(
      () => tasks.filter((task) => task.done).length,
      [tasks]
  );

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
        prev.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
      <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">React To-do App</h1>
            <span className="text-sm text-slate-600">
            {completedCount} / {tasks.length} done
          </span>
          </div>

          {/* Input */}
          <div className="mt-4 flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a task..."
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
                onClick={addTask}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
            >
              Add
            </button>
          </div>

          {
          }
          <ul className="mt-5 space-y-2">
            {tasks.length === 0 ? (
                <li className="text-center text-slate-500">
                  No tasks yet
                </li>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                ))
            )}
          </ul>

        </div>
      </main>
  );
}

export default App;