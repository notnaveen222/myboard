import { getTodos } from "../lib/todos/todos";
import TodoSection from "./components/TodoSection";

export default async function board() {
  const todos = (await getTodos()) ?? [];
  return (
    <div className="flex flex-col space-y-5  flex-1 p-5">
      <div>
        <div className="text-xl font-medium">Todos</div>
        <TodoSection todos={todos} />
      </div>
    </div>
  );
}
