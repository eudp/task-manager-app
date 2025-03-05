"use client";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

export default function HomePage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8">
          Task Manager App
        </h1>
        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
}
