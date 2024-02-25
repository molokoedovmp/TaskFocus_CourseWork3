import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    const newTask: Task = { id: tasks.length + 1, title: `Task ${tasks.length + 1}` };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <button onClick={addTask}>Добавить задачу</button>
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => removeTask(task.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
