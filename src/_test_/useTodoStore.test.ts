import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useTodoStore } from '../stores/useTodoStore';

describe("useTodoStore (Habit logic test)", () => {

  beforeEach(() => {
    useTodoStore.setState({ todoChildren: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  
  it('must add new habit successfully', () => {
    useTodoStore.getState().addTodoChild("This habit is added by vitest");

    const habits = useTodoStore.getState().todoChildren;

    expect(habits).toHaveLength(1);
    expect(habits[0].heading).toBe("This habit is added by vitest");
    expect(habits[0].isCompleted).toBe(false);
  });

 
  it('must remove habit by its id', () => {
    const store = useTodoStore.getState();

    store.addTodoChild("To do something");

    const habitID = useTodoStore.getState().todoChildren[0].id;

    useTodoStore.getState().removeChild(habitID);

    const updatedHabits = useTodoStore.getState().todoChildren;
    expect(updatedHabits).toHaveLength(0);
  });

  
  it('MUST reset checkers', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-12T12:00:00.000Z'));

    const store = useTodoStore.getState();

    store.addTodoChild('To do something');
    const habitId = useTodoStore.getState().todoChildren[0].id;
    store.toggleChild(habitId);

    expect(useTodoStore.getState().todoChildren[0].isCompleted).toBe(true);
    expect(useTodoStore.getState().todoChildren[0].updatedAt).toBe('2026-06-12');

    vi.setSystemTime(new Date('2026-06-13T12:00:00.000Z'));

    useTodoStore.getState().resetNewDay();

    const updatedHabit = useTodoStore.getState().todoChildren[0];
    
    expect(updatedHabit.isCompleted).toBe(false); 
    expect(updatedHabit.updatedAt).toBe('2026-06-13'); 
  });

  
  it("MUST NOT reset checkers", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-12T12:00:00.000Z'));

    const store = useTodoStore.getState();
    store.addTodoChild('Почитать книгу');
    const habitId = useTodoStore.getState().todoChildren[0].id;
    store.toggleChild(habitId); 

    vi.setSystemTime(new Date('2026-06-12T16:00:00.000Z'));
    
    useTodoStore.getState().resetNewDay();

    const habit = useTodoStore.getState().todoChildren[0];
    expect(habit.isCompleted).toBe(true);
    expect(habit.updatedAt).toBe('2026-06-12');
  });

}); 
