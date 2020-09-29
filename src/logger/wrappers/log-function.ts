import { logger } from '../logger';
import { functionLogFormatter } from '../formatter';

export const logFunction = (scope: string, func) => {
  return (...args) => {
    logger.info(functionLogFormatter(scope, func.name, args));
    const profiler = logger.startTimer();
    let result = func(...args);
    if (result instanceof Promise) {
      return result.then(res => {
        profiler.done({message: `${ scope }: ${ func.name }:`});
        return res;
      });
    }
    profiler.done({message: `${ scope }: ${ func.name }:`});
    return result;
  };
};
