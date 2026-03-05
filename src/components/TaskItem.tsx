import type { Task } from "../App";

type Props = {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

function TaskItem({ task, onToggle, onDelete }: Props) {
    return (
        <li className="flex items-center justify-between rounded-lg border bg-slate-50 px-4 py-2">
      <span
          onClick={() => onToggle(task.id)}
          className={
              task.done
                  ? "cursor-pointer text-slate-400 line-through"
                  : "cursor-pointer text-slate-900"
          }
      >
        {task.title}
      </span>

            <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    );
}

export default TaskItem;