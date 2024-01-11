import { TaskBase, TaskAbortError, TaskStage, PdfEngineError } from './pdf';

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
    // @ts-expect-error ignore type check in test
    expect(task.state.result).toBe('hello');
    expect(resolved).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledWith('hello');
    expect(rejected).not.toHaveBeenCalled();
  });

  test('reject should update state to rejected and call rejected callback', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    const error = new PdfEngineError('hello');
    task.reject(error);
    expect(task.state.stage).toBe(TaskStage.Rejected);
    // @ts-expect-error ignore type check in test
    expect(task.state.error).toBe(error);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledWith(error);
    expect(resolved).not.toHaveBeenCalled();
  });

  test('abort should update state to aborted and call rejected callback', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    task.abort();
    expect(task.state.stage).toBe(TaskStage.Aborted);
    // @ts-expect-error ignore type check in test
    expect(task.state.error instanceof TaskAbortError).toBe(true);
    expect(rejected).toHaveBeenCalledTimes(1);
    // @ts-expect-error ignore type check in test
    expect(rejected).toHaveBeenCalledWith(task.state.error);
    expect(resolved).not.toHaveBeenCalled();
  });

  test('abort can accept customized error', () => {
    const task = new TaskBase<any>();
    const resolved = jest.fn();
    const rejected = jest.fn();
    task.wait(resolved, rejected);
    const error = new PdfEngineError('hello');
    task.abort(error);
    expect(task.state.stage).toBe(TaskStage.Aborted);
    // @ts-expect-error ignore type check in test
    expect(task.state.error).toBe(error);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledWith(error);
    expect(resolved).not.toHaveBeenCalled();
  });
});
