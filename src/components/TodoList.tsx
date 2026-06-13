import React from 'react';
import { useTodoStore } from '../stores/useTodoStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todoChildren = useTodoStore((state) => state.todoChildren);

  const totalChildren = todoChildren.length;
  const completedChildrenCount = todoChildren.filter((child) => child.isCompleted).length;
  const hasChildren = totalChildren > 0;

  if (!hasChildren) {
    return <p>Here is nothing to do</p>;
  }

  return (
    <>
      <h2>
        You've completed {completedChildrenCount}/{totalChildren} habits
      </h2>
      <ul style={styles.ul}>
        {todoChildren.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}

const styles = {
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0 0',
    width: '100%',
    maxWidth: '600px',
  } as React.CSSProperties,
};
