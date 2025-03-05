import { useTasks } from "../contexts/context";
import { Task } from "./TaskItem";

export default function TaskList() {
  const [tasks] = useTasks();

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}
