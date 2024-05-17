// Monkey patching Hooks.call and Hooks.callAll to log all hooks (since the docs' list seems to be incomplete)

Hooks.call = new Proxy(Hooks.call, {
  apply: (target, thisArg, argumentsList) => {
    console.log('Hooks.call', argumentsList);
    return target.apply(thisArg, argumentsList);
  },
});

Hooks.callAll = new Proxy(Hooks.callAll, {
  apply: (target, thisArg, argumentsList) => {
    console.log('Hooks.callAll', argumentsList);
    return target.apply(thisArg, argumentsList);
  },
});
