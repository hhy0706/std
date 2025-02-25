function Observer(obj) {
  if (!(obj && ["function", "object"].includes(typeof obj))) return;
  for (let item in obj) {
    Reactive(obj, item, obj[item]);
  }
}
function Reactive(obj, key, val) {
  Observer(val);
  Object.defineProperties(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal == val) return;
      Observer(newVal);
      obj[key] = newVal;
    },
  });
}
