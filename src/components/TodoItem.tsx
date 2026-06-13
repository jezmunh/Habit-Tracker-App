import React, { memo } from 'react';
import { useTodoStore } from '../stores/useTodoStore';
import type { TodoChild } from '../stores/useTodoStore';

interface TodoItemProps {
  todo: TodoChild;
}

export const TodoItem = memo(function TodoItem({ todo }: TodoItemProps) {
  const toggleChild = useTodoStore((state) => state.toggleChild);
  const removeChild = useTodoStore((state) => state.removeChild);

  return (
    <li style={styles.li}>

      <label style={styles.label}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleChild(todo.id)}
          style={styles.checkbox}
        />
        <span
          style={{
            ...styles.span,
            textDecoration: todo.isCompleted ? 'line-through' : 'none',
            color: todo.isCompleted ? '#888' : 'inherit',
          }}
        >
          {todo.heading}
        </span>
      </label>

      <button
        onClick={(event) => {
          event.stopPropagation();
          removeChild(todo.id);
        }}
        style={styles.deleteBtn}
      >
        Delete
      </button>
    </li>
  );
});

const styles = {
  li: {
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  } as React.CSSProperties,
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    flex: 1,
  } as React.CSSProperties,
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  } as React.CSSProperties,
  span: {
    transition: 'all 0.2s ease',
    fontSize: '16px',
  } as React.CSSProperties,
  deleteBtn: {
    padding: '4px 8px',
    cursor: 'pointer',
  } as React.CSSProperties,
};
