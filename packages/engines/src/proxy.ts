export class EngineWorkerProxy {
  worker: Worker;

  constructor(url: string) {
    this.worker = new Worker('./worker');
  }
}
