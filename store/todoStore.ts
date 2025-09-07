import { create } from 'zustand';

// Todo modeli için typescript türü
interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Store içereceği durum ve eylemler
interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  updateTodo: (id, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));