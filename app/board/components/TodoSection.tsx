"use client";

import axios from "axios";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [newTodo, setNewTodo] = useState<string | "">("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTodoStatus = async (todoId: string, isChecked: boolean) => {
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
  const handleAddTodo = async () => {
    const new_todo = { todo_id: "newTodo", todo: newTodo, isCompleted: false };
    setTodos((prevTodos) => [new_todo, ...prevTodos]);
    setDialogOpen(false);
    try {
      const response = await axios.post("/api/todos/add", {
        todo: newTodo,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id == "newTodo"
            ? { ...todo, todo_id: response.data.newTodoId }
            : todo,
        ),
      );
    } catch (error) {
      console.log("Error while adding a todo.");
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.todo_id != "newTodo"),
      );
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardAction>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="py-1 text-lg flex justify-center items-center size-6 px-1 rounded-sm">
              +
            </DialogTrigger>
            <DialogContent className="w-fit">
              <DialogHeader>
                <DialogTitle className={"mb-2"}>
                  Enter your new todo.
                </DialogTitle>
                <DialogDescription>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewTodo(e.target.value)
                    }
                    onKeyDown={(
                      event: React.KeyboardEvent<HTMLInputElement>,
                    ) => {
                      if (event.key == "Enter") {
                        console.log(event.key);
                        handleAddTodo();
                      }
                    }}
                    value={newTodo}
                    placeholder="Go To Gym"
                    className="w-full text-white min-w-sm"
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={<Button variant={"outline"}>Cancel</Button>}
                />
                <Button type="submit" onClick={handleAddTodo}>
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="pl-2">
          {todos.map((todo) => {
            return (
              <div
                className="text-lg flex gap-x-2 items-center"
                key={todo.todo_id}
              >
                <Checkbox
                  className="mt-0.5"
                  onCheckedChange={(checked) =>
                    handleTodoStatus(todo.todo_id, checked)
                  }
                  checked={todo.isCompleted}
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
      </CardContent>
    </Card>
  );
}
