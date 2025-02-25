### [vue通讯方式](https://juejin.cn/post/6844903845642911752)

### [SPA页面](https://juejin.cn/post/7018876571658223623)

### [响应式](https://juejin.cn/post/7079807948830015502)

```js
https://juejin.cn/post/6989106100582744072
```



### [$nextTick](https://juejin.cn/post/6844904147804749832)

```js
当改变数据后，要基于更新后的DOM进行某些操作，其回调函数就会执行
首先把nexttick中的回调函数放入一个callback队列中，任务放完之后，会执行timerfunc的函数，主要是根据浏览器环境把执行队列中回调函数的函数放入微任务还是宏任务，优先是promise.then。而这个执行回调的flushcallback函数主要是把队列中的回调取出来执行，并把队列清空
```

### [data是函数]()

```
为了防止复用，组件的data写成一个函数就会返回一份新的data,当改变数据不会影响其他组件的data,每个组件的data都是独有的
```

### [vuex刷新页面](https://juejin.cn/post/6844903791838363655)

### [key](.name)

```js
虚拟DOM中key的作用：
key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,
随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

对比规则：
(1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
(2).旧虚拟DOM中未找到与新虚拟DOM相同的key
创建新的真实DOM，随后渲染到到页面。

用index作为key可能会引发的问题：
1.若对数据进行：逆序添加、逆序删除等破坏顺序操作:
会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

如果结构中还包含输入类的DOM：
会产生错误DOM更新 ==> 界面有问题。

开发中如何选择key?:
1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
使用index作为key是没有问题的。

```

### [diff算法](https://juejin.cn/post/6844903607913938951)

### [watch和computed]()

```js
computed用于处理复杂的逻辑运算，可以把computed的属性当做响应式数据去使用，而且会缓存计算结果，只有依赖的数据发生改变，才会重新计算
watch用于监听数据的改变去做一些业务逻辑操作，watch支持异步操作，没有缓存
```

### [路由模式]()

```js
有两种路由模式一种是hash模式一种是history模式
hash模式改变 URL 中的 hash 部分不会引起页面刷新
通过 hashchange 事件监听 URL 的变化
history模式
history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新
history 提供类似 hashchange 事件的 popstate 事件
通过pushState/replaceState或<a>标签改变 URL 不会触发 popstate 事件。
调用history的back，go，forward方法
通过浏览器前进后退改变 URL 时会触发 popstate 事件
但是浏览器刷新的时候会按照路径向服务器请求资源，而服务器没有这些资源就会出现404的情况
要解决404  安装一个connect-history-api-fallback npm包 就能够实现
```

