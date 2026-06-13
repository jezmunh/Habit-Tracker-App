# Habit Tracker App

A pet-project scaffolded for breaking apart **React**, **TypeScript**, **Zustand** and **Vitest**

# Key features

* **Types**: App is fully typed with TypeScript interfaces
* **State management**: *Zustand* is used in here to quit props-drilling and make code easier to read
* **Optimisation**: Main components is divided on different components, each operating purposely. *React.memo* is used to avoid uncessary extra renders when interacting with components
* **Unit testing**: Business and time-travel (`vi.useFakeTimers`) is covered by *Vitest*

# Stack

* React 18+
* TypeScript
* Zustand (persist middleware)
* Vitest

# Testing

```bash
npm run test
```
