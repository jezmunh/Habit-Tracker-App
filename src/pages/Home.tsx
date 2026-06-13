import { useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { useTodoStore } from '../stores/useTodoStore';

function Home() {

  const resetNewDay = useTodoStore((state) => state.resetNewDay);

   useEffect(() => {    
    resetNewDay();
  }, [resetNewDay]);

  return (
    <main style={mainStyle}>
      <TodoForm />
      <TodoList />
    </main>
  );
}

const mainStyle = 
{ 
  padding: '20px', 
  width: '100vw', 
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem'
} as React.CSSProperties

export default Home;
