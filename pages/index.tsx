import { useEffect } from 'react';
import { useTodoStore } from '../store/todoStore';
import { getTodos } from '../services/apiService';
import TodoForm from '../components/todoForm';
import TodoItem from '../components/todoItem';

const Home = () => {
  const todos = useTodoStore((state) => state.todos);

  useEffect(() => {
    getTodos();
  }, []);

  const pendingTodos = todos.filter(todo => todo.status === 'pending');
  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Yapılacaklar Listesi</h1>
        <TodoForm />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Yapılacaklar Listesi */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Yapılacaklar ({pendingTodos.length})</h2>
            {pendingTodos.length === 0 ? (
              <p className="text-center p-8 bg-white rounded-xl shadow-lg text-gray-500">
                Hiç yapılacak iş yok. Harika!
              </p>
            ) : (
              <ul className="space-y-4">
                {pendingTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </div>
          
          {/* Tamamlananlar Listesi */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tamamlananlar ({completedTodos.length})</h2>
            {completedTodos.length === 0 ? (
              <p className="text-center p-8 bg-white rounded-xl shadow-lg text-gray-500">
                Henüz tamamlanmış bir iş yok.
              </p>
            ) : (
              <ul className="space-y-4">
                {completedTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;