class ReactiveEffect {
  private _fn: any;
  constructor(fn: any) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    this._fn();
  }
}

const targetMap = new Map();
export function track(target, key) {
  // 需要一个存储fn的容器

  // 存储映射关系：target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 初始化过程
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key,dep)
  }

  dep.add(activeEffect);
}

let activeEffect;
export function effect(fn: any) {
  // fn
  const _effect = new ReactiveEffect(fn);

  _effect.run();
}
