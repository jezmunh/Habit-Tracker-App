import React, { useState } from 'react';
import { useTodoStore } from '../stores/useTodoStore';

export function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const addTodoChild = useTodoStore((state) => state.addTodoChild);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    addTodoChild(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What to do?"
      />
      <button type="submit">Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: '8px',
  } as React.CSSProperties,
};
