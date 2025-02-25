function Promise(executor) {
  this.PromiseState = "pending";
  this.PromiseResult = null;
  const self = this;
  this.callbacks = [];
  function resolve(data) {
    if (self.PromiseState !== "pending") return;
    self.PromiseState = "fulfilled";
    self.PromiseResult = data;
    // if(self.callback.onResolved){
    //   self.callback.onResolved(data)
    // }
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
  }
  function reject(data) {
    if (self.PromiseState !== "pending") return;
    self.PromiseState = "rejected";
    self.PromiseResult = data;
    // if(self.callback.onRejected){
    //   self.callback.onRejected(data)
    // }

    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  if (typeof onRejected !== "function") {
    onRejected = (reason) => {
      throw reason;
    };
  }
  if (typeof onResolved !== "function") {
    onResolved = (value) => value;
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
    if (this.PromiseState === "fulfilled") {
      setTimeout(() => {
        callback(onResolved);
      });
    }

    if (this.PromiseState === "rejected") {
      setTimeout(() => {
        callback(onRejected);
      });
    }
    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved() {
          callback(onResolved);
        },
        onRejected() {
          callback(onRejected);
        },
      });
    }
  });
};
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (v) => {
          resolve(v);
        },
        (r) => {
          reject(r);
        }
      );
    } else {
      resolve(value);
    }
  });
};
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value);
  });
};
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let arr = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          count++;
          arr[i] = v;
          if (count === promises.length) {
            resolve(arr);
          }
        },
        (r) => {
          reject(r);
        }
      );
    }
  });
};
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          resolve(v);
        },
        (r) => {
          reject(r);
        }
      );
    }
  });
};
