/* @flow */
export function setIn<T:{}>(target:T, field:string, value: any):T {
  const fields = field.split('.');
  const subField:string = fields.shift();
  const newValue = fields.length === 0 ? value : setIn(target[subField], fields.join('.'), value);
  return { ...target, [subField]: newValue };
}

export const modifyArrayEntry = (arr:Array<any>, matcher:Function, modifier:Function) =>
  arr.map(i => (matcher(i) ? modifier(i) : i));

export function removeIn(value:any, prop:string, entry:any) {
  const arr:Array<any> = value[prop];
  return {
    ...value,
    [prop]: [...arr.filter(e => e !== entry)],
  };
}

export function pushIn<T:{}>(value:T, prop:string, entry:any) {
  return {
    ...value,
    [prop]: [...value[prop], entry],
  };
}

export function pop<T>(array:Array<T>):[T, Array<T>] {
  const value = array.pop();
  return [value, array.concat()];
}
