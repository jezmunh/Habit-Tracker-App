import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TodoChild {
  id: string;
  heading: string;
  isCompleted: boolean;
  updatedAt: string;
}

interface TodoState {
  todoChildren: TodoChild[];
  addTodoChild: (heading: string) => void;
  toggleChild: (id: string) => void;
  removeChild: (id: string) => void;
  resetNewDay: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({

      todoChildren: [],

    
      addTodoChild: (heading) =>
        set((state) => ({
          todoChildren: [
            ...state.todoChildren,
            {
              id: crypto.randomUUID(),
              heading,
              isCompleted: false,
              updatedAt: getToday(),
            },
          ],
        })),

      toggleChild: (id) =>
        set((state) => ({
          todoChildren: state.todoChildren.map((child) =>
            child.id === id 
              ? { ...child, isCompleted: !child.isCompleted, updatedAt: getToday() } 
              : child
          ),
        })),

      removeChild: (id) =>
        set((state) => ({
          todoChildren: state.todoChildren.filter((child) => child.id !== id),
        })),

      resetNewDay: () =>
        set((state) => {
          const today = getToday();
          const hasOldHabits = state.todoChildren.some((child) => child.updatedAt !== today);

          if (!hasOldHabits) return {};

          return {
            todoChildren: state.todoChildren.map((child) =>
              child.updatedAt !== today
                ? { ...child, isCompleted: false, updatedAt: today }
                : child
            ),
          };
        }),
    }), 
    {
      name: 'saved-children-todo', 
    }
  )
);
