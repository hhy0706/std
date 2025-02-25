// https://juejin.cn/post/6844903929705136141
const target = {
    field1: 1,
    field2: null,

    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    field5() {
        console.log(222)
    },
    a: new Set([1, 2, 3]),
    b: new Map([['a', 1], ['b', 2]])
};
target.target = target;
function forEach(array, cb) {
    let index = 0;
    while (index < array.length) {
        cb(array[index], index)
        ++index
    }
}
function getType(target) {
    return Object.prototype.toString.call(target)
}
function Init(target) {
    const construct = target.constructor;
    return new construct()
}
function clone(target, map = new WeakMap()) {
    if ((typeof target === 'object') && target !== null) {
        if (getType(target) == '[object RegExp]') return new RegExp(target);
        if (getType(target) == '[object Date]') return new Date(target);
        if (getType(target) == '[object Error]') return new Error(target);
        const cloneTarget = Init(target);
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneTarget)
        if (getType(target) === '[object Set]') {

            for (let value of target) {
                cloneTarget.add(clone(value, map))
            }
            return cloneTarget
        }
        if (getType(target) === '[object Map]') {

            for (let [key, value] of target) {
                cloneTarget.set(key, clone(value, map))
            }
            return cloneTarget
        }
        let isArray = Array.isArray(target)


        // for(let key in target){
        //     cloneTarget[key]= clone(target[key],map)
        // }
        let keys = isArray ? target : Object.keys(target);
        forEach(keys, (value, key) => {
            if (!isArray) {
                key = value;
            }
            cloneTarget[key] = clone(target[key], map)
        })

        return cloneTarget
    }
    else {
        return target;
    }
}
let obj = clone(target);

console.log(target);
obj.b.set('c', 3)
obj.field4.push(33)
console.log(obj)