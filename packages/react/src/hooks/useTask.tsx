import { ignore } from '@unionpdf/models';
import { Task } from '@unionpdf/models';
import { useEffect, useState } from 'react';

/**
 * Hooks for using task
 * @param creator - callback for creating task
 * @returns
 *
 * @public
 */
export function useTask<T>(creator: () => Task<T>): Task<T> | null {
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

/**
 * Hooks for using task value
 * @param creator - callback for creating task
 * @returns resolved value of task
 *
 * @public
 */
export function useTaskValue<T>(creator: () => Task<T>) {
  const [value, setValue] = useState<T | null>(null);
  const task = useTask(creator);

  useEffect(() => {
    task?.wait(setValue, ignore);
  }, [task]);

  return value;
}
