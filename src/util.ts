export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

export function get(obj: any, path: string|string[], defValue?: any): any {
  if (!path) {
    return undefined;
  }

  const pathArray: string[] = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result: any = pathArray.reduce(
    (prevObj: string, key: string) => prevObj && prevObj[key],
    obj
  );

  return result === undefined ? defValue : result;
}
