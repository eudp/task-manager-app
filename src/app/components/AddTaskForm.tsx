import { useState } from "react";
import { useTasks } from "../contexts/context";

export default function AddTaskForm() {
  const [, dispatch] = useTasks();
  const [newTaskInput, setNewTaskInput] = useState("");

  function handleSumit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    dispatch({ type: "add", title: newTaskInput });
    setNewTaskInput("");
  }

  return (
    <form onSubmit={handleSumit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
          placeholder="Add new task..."
          required
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>
    </form>
  );
}
