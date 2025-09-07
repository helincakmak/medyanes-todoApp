import React, { useState } from 'react';
import { updateTodo, removeTodo } from '../services/apiService';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleStatusChange = () => {
    const newStatus = todo.status === 'pending' ? 'completed' : 'pending';
    updateTodo(todo.id, { status: newStatus });
  };

  const handleDelete = () => {
    removeTodo(todo.id);
  };

  const handleUpdate = () => {
    if (newTitle.trim() === '') return;
    updateTodo(todo.id, { title: newTitle, description: newDescription });
    setIsEditing(false);
  };

  return (
    <li className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {isEditing ? (
        // Düzenleme Modu
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-xl font-bold"
            required
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-600"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Kaydet
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      ) : (
        // Normal Görüntüleme Modu
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex-1 mb-4 sm:mb-0">
            <h2 className={`text-2xl font-bold ${todo.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {todo.title}
            </h2>
            {todo.description && (
              <p className="text-gray-600 mt-2">{todo.description}</p>
            )}
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mt-2 ${
              todo.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {todo.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            {/* Tamamlandı/Yapılacak butonu için Okey İşareti */}
            <button
              onClick={handleStatusChange}
              className={`p-2 rounded-full text-white ${
                todo.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
              aria-label="Durumu Değiştir"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
            {/* Düzenle buton */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Düzenle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-4.225 1.258a.75.75 0 01-.983-.983l1.258-4.225a4.5 4.5 0 011.13-1.897l8.22-8.22z" />
              </svg>
            </button>
            {/* sil  buton */}
            <button
              onClick={handleDelete}
              className="p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors"
              aria-label="Sil"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;