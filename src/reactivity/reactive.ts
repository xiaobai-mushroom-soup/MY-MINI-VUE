import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function reactive(raw: any) {
  return createActiveObject(raw,mutableHandlers)
}

export function readonly(raw: any) {
  return createActiveObject(raw,readonlyHandlers)
}
