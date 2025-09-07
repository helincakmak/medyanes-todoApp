import { useTodoStore } from '../store/todoStore';

const API_BASE_URL = '/api';

// Tüm todoları getiren fonk
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    useTodoStore.getState().setTodos(todos);
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// Yeni todo ekleyen fonk
export const addTodo = async (title: string, description: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    const newTodo = await response.json();
    useTodoStore.getState().addTodo(newTodo);
    return newTodo;
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

// todoyu güncelleyen fonk
export const updateTodo = async (id: string, updatedData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const updatedTodo = await response.json();
    useTodoStore.getState().updateTodo(id, updatedTodo);
    return updatedTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

// todoyu silen fonk
export const removeTodo = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove todo');
    }
    useTodoStore.getState().removeTodo(id);
    return true;
  } catch (error) {
    console.error('Error removing todo:', error);
    return false;
  }
};