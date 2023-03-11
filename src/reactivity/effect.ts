class ReactiveEffect {
  private _fn: any;

  constructor(fn: any, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    return this._fn();
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
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

let activeEffect;
export function effect(fn: any, options: any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler);

  _effect.run();

  return _effect.run.bind(_effect);
}
