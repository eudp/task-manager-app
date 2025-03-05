"use client";
import { createContext, use, useEffect, useReducer } from "react";

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type TasksTuple = [Task[], React.ActionDispatch<[action: TasksActions]>];

type TasksActions =
  | { type: "add"; title: string }
  | { type: "updateStatus"; id: number }
  | { type: "delete"; id: number }
  | { type: "init"; tasks: Task[] };

function reducer(currentState: Task[], action: TasksActions) {
  switch (action.type) {
    case "add": {
      return [
        ...currentState,
        { id: Math.random(), userId: 1, title: action.title, completed: false },
      ];
    }
    case "updateStatus": {
      return currentState.map((task) => {
        if (task.id === action.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    }
    case "delete": {
      return currentState.filter((task) => task.id !== action.id);
    }
    case "init": {
      return action.tasks;
    }
  }
}

const TasksContitle = createContext<TasksTuple | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch({ type: "init", tasks: JSON.parse(storedTasks) });
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((res) => res.json())
        .then((apiTasks) => {
          localStorage.setItem("tasks", JSON.stringify(apiTasks));
          dispatch({ type: "init", tasks: apiTasks });
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return <TasksContitle value={[tasks, dispatch]}>{children}</TasksContitle>;
}

export function useTasks() {
  const contitle = use(TasksContitle);

  if (!contitle) {
    throw new Error("use this inside the TaskProvider");
  }

  return contitle;
}
