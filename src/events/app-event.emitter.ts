import { EventEmitter } from 'events';

type AppEvents = 'stop-app' | 'app-inited' | 'app-stopped';

class AppEventEmitter extends EventEmitter {
  emit(event: AppEvents, ...args: any[]): boolean {
   return super.emit(event, ...args);
  }

  on(event: AppEvents, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}

const appEventEmitter = new AppEventEmitter();

export default appEventEmitter;
