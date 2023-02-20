import { Task } from '@unionpdf/models';
import { useEffect, useState } from 'react';

export function useTask<T>(creator: () => Task<T>) {
  const [task, setTask] = useState<Task<T> | null>(null);

  useEffect(() => {
    const task = creator();
    setTask(task);

    return () => {
      task.abort();
    };
  }, [creator]);

  return task;
}
