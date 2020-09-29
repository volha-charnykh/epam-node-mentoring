import { logFunction } from "./log-function";

export const logObjectMethods = <T>(name: string, obj: T): T => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      obj[key] = logFunction(name, obj[key]);
    }
  });
  return obj;
};
