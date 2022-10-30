export class Worker {
  id: string;
  constructor(private port: MessagePort) {
    this.id = `${Date.now()}.${Math.random()}`;
  }

  start() {
    this.port.addEventListener('message', this.handle);
  }

  stop() {
    this.port.removeEventListener('message', this.handle);
  }

  handle = () => {};
}

export type Command =
  | {
      id: string;
      type: 'StartWorkerRequest';
      data: {
        port: MessagePort;
      };
    }
  | {
      id: string;
      type: 'StopWorkerRequest';
      data: {
        id: string;
      };
    };

const workers: Map<string, Worker> = new Map();

function createWorker(port: MessagePort) {
  const worker = new Worker(port);
  worker.start();
  workers.set(worker.id, worker);
}

function removeWorker(id: string) {
  const worker = workers.get(id);
  worker?.stop();
  workers.delete(id);
}

function handle(evt: MessageEvent) {
  try {
    const command = evt.data as Command;
    switch (command.type) {
      case 'StartWorkerRequest':
        createWorker(command.data.port);
        self.postMessage({
          id: command.id,
          type: 'StartWorkerResponse',
          data: {
            result: true,
          },
        });
        break;
      case 'StopWorkerRequest':
        removeWorker(command.data.id);
        self.postMessage({
          id: command.id,
          type: 'StopWorkerResponse',
          data: {
            result: true,
          },
        });
        break;
    }
  } catch (e) {
    console.log(e);
  }
}

self.onmessage = handle;
