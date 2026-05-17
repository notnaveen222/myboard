"use client";

import axios from "axios";
import { useState } from "react";

interface Todo {
  todo_id: string;
  todo: string;
  isCompleted: boolean;
}
export default function TodoSection({
  todos: initialTodos,
}: {
  todos: Todo[];
}) {
  const [todos, setTodos] = useState<Todo[] | []>(initialTodos);
  const handleTodoStatus = async (todoId: any, isChecked: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === todoId ? { ...todo, isCompleted: isChecked } : todo,
      ),
    );
    try {
      const response = await axios.post("/api/todos/status", {
        todoId: todoId,
        todoStatus: isChecked,
      });
    } catch (error) {
      console.log("Failed to update todo.");
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === todoId ? { ...todo, isCompleted: !isChecked } : todo,
        ),
      );
    }
  };
  return (
    <div className="pl-2">
      {todos.map((todo) => {
        return (
          <div className="text-lg flex gap-x-2" key={todo.todo_id}>
            <input
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTodoStatus(todo.todo_id, e.target.checked)
              }
              checked={todo.isCompleted}
              className="before:bg-black border-gray-500"
            />
            <div
              className={`${todo.isCompleted ? "text-white/70" : ""} transition-all duration-150`}
            >
              {todo.todo}
            </div>
          </div>
        );
      })}
    </div>
  );
}
