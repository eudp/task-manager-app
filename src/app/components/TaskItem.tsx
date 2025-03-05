import { useState, useEffect } from "react";
import { useTasks, type Task } from "../contexts/context";
import { DeleteIcon } from "./DeleteIcon";

export function Task({ task }: { task: Task }) {
  const [, dispatch] = useTasks();
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (isNew) {
      const timeout = setTimeout(() => setIsNew(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isNew]);

  return (
    <li
      className={`flex items-center gap-4 p-4 bg-gray-800 rounded-lg mb-2 transition-all duration-300 ease-in-out ${
        isNew ? "opacity-0 translate-y-[-10px]" : "opacity-100 translate-y-0"
      }`}
    >
      <input
        id={String(task.id)}
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch({ type: "updateStatus", id: task.id })}
        className="w-5 h-5 rounded bg-gray-700 border-gray-600 accent-indigo-600 cursor-pointer"
      />
      <label
        htmlFor={String(task.id)}
        className={`flex-1 ${
          task.completed ? "line-through text-gray-500" : "text-gray-100"
        } transition-all duration-200 ease-in-out`}
      >
        {task.title}
      </label>
      <button
        onClick={() => dispatch({ type: "delete", id: task.id })}
        className="text-red-400 p-1 hover:text-red-300 cursor-pointer"
      >
        <DeleteIcon />
      </button>
    </li>
  );
}
