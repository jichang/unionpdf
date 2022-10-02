export class Defer<T> {
  promise: Promise<T>;
  resolve!: (t: T) => void;
  reject!: (e: Error) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
