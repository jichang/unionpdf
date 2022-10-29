import { TaskBase, TaskAbortError, TaskStage } from './pdf';

describe('TaskBase', () => {
  test('should has pending state by default', () => {
    const task = new TaskBase();
    expect(task.state.stage).toBe(TaskStage.Pending);
  });

  test('resolve should update state to resolved and call resolved callback', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    task.resolve('hello');
    expect(task.state.stage).toBe(TaskStage.Resolved);
    // @ts-ignore
    expect(task.state.result).toBe('hello');
    expect(resolved).toBeCalledTimes(1);
    expect(resolved).toBeCalledWith('hello');
    expect(rejected).not.toBeCalled();
  });

  test('reject should update state to rejected and call rejected callback', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    const error = new Error('hello');
    task.reject(error);
    expect(task.state.stage).toBe(TaskStage.Rejected);
    // @ts-ignore
    expect(task.state.error).toBe(error);
    expect(rejected).toBeCalledTimes(1);
    expect(rejected).toBeCalledWith(error);
    expect(resolved).not.toBeCalled();
  });

  test('abort should update state to aborted and call rejected callback', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    task.abort();
    expect(task.state.stage).toBe(TaskStage.Aborted);
    // @ts-ignore
    expect(task.state.error instanceof TaskAbortError).toBe(true);
    expect(rejected).toBeCalledTimes(1);
    // @ts-ignore
    expect(rejected).toBeCalledWith(task.state.error);
    expect(resolved).not.toBeCalled();
  });

  test('abort can accept customized error', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    const error = new Error('hello');
    task.abort(error);
    expect(task.state.stage).toBe(TaskStage.Aborted);
    // @ts-ignore
    expect(task.state.error).toBe(error);
    expect(rejected).toBeCalledTimes(1);
    expect(rejected).toBeCalledWith(error);
    expect(resolved).not.toBeCalled();
  });
});
