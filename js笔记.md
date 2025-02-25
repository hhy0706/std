 

### <a id="data">判断数据类型</a>
  [引用内容](https://juejin.cn/post/6971713620019249188)
|typeof |
|   -    |
|对于基本类型，除 null 以外，均可以返回正确的结果。|
|对于引用类型，除 function 以外，一律返回 object 类型。|
|对于 null ，返回 object 类型。|
| 对于 function 返回 function 类型。|

|instanceof|
| - |
|不能检测出原始数据类型|

|constructor|
|-|
|null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，其余都能返回它本身|

|toString|
|-|
|都能得出它本身例如[object Object]|

 ### <a id="type">null与undefined区别</a> 
 null是一个表示“空”的对象，转为数值时为0；undefined是一个表示”此处无定义”的原始值，转为数值时为NaN。



###  <a id="int">parseInt</a>

数字太大会以科学计数法的方式表示，视为字符串，输出为1

第二个参数2-36进制  超过这个范围会返回NaN ,是0 null undefined会忽略。

如果第一位不是字符串会先转换字符串

如果第一位参数有比第二位进制数大的，从高位开始，返回比进制小的。

### <a>判断数组的方法</a>

1. instanceof  (arr instanceof Array)
2. Array.isArray()
3. Array.prototype.isPrototypeOf()
4. constructor
5. Object.getPrototypeof()
6. Object.prototype.toString.call()
7. 第六个全能，第四个和第五个类似，第一个和第三个类型

### <a>转换为数组</a>

1. 使用Array的slice

```js
Array.prototype.slice.call(类数组对象) 或者filter,map,reduce
```


2. 使用es6种扩展运算符

```js
[...类数组对象];
```



3.  Array.from

```js
Array.from(类数组对象)
```



### [数组扁平化]()

``` js
// 方法一  转化为字符串
 let array = [1, [2], [3, [4, [5]]]]
 function flat(arr) {
   return arr.toString().split(',').map(val => +val)
 }
 console.log(flat(array))
```

``` js
//方法二  ES6
array.flat(Infinity)
```

```js
// 方法三  递归

 function flatten(arr, depth) {
      const res = [];
      function flat(arr, depth) {
        arr.forEach((item) => {
          if (Array.isArray(item) && depth > 0) {
            flat(item, depth - 1);
          } else {
            res.push(item);
          }
        });
      }
      flat(arr, depth);
      return res;
    }
```

```js
//reduce+递归
    function flatten(arr, depth) {
      if (depth <= 0) return arr;
      return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur, depth - 1) : cur);
      }, []);
    }

```

```js
//递归+扩展运算符
function flatten(arr) {
  let flatArr=[];
    for (let index = 0; index < arr.length; index++) 	{
      Array.isArray(arr[index])
           
       ? flatArr.push(...flatten(arr[index]))
       : flatArr.push(arr[index])
   }
    return flatArr;
  }
```



### [数组去重]()

```js
//开关
function unique(arr) {
let res =[]
    for (let i = 0; i < arr.length; i++) {
        let flag = true
        for (let j = 0; j < res.length; j++) {
            if (arr[i] === res[j]) {
                flag = false;
                break
            }
        }
        if (flag) {
            res.push(arr[i])
        }
    }
    return res
}
```

```js
//indexOf
function unique(arr){
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }
    return res
}

```

```js
 //filter  indexof第一次搜索的值的索引是否和index一样
function unique(arr) {
    return arr.filter( function(item, index){
        return arr.indexOf(item) === index;
    });
}
```

```js
//对象键不相同
function unique(arr) {
    let res = [],
        obj = {}
    for (let i = 0; i < arr.length; i++) {
    
        if (! (arr[i] in obj)) {
            res.push(arr[i])
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    return res
}

```

```js
ES6
[...new Set(arr)]
Array.from(new Set(arr))
Array.prototype.slice.call(new Set(arr))
```



```js
//sort排序
function unique(arr) {
    arr = arr.sort()
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            res.push(arr[i])
        }
    }
    return res
}
```

```js
//includes
2.function unique(arr){
const res = [];
  for(i=0;i<arr.length;i++){
    if(!res.includes(arr[i])){
      res.push(arr[i]);

    }

  }
  return res;
}

```



### [new命令原理]()

```

创建一个空对象，作为将要返回的对象实例。
将这个空对象的原型，指向构造函数的prototype属性。
将这个空对象赋值给函数内部的this关键字。
开始执行构造函数内部的代码。
var f = new F();
// 等同于
var f = Object.setPrototypeOf({}, F.prototype);
F.call(f);
```



### [防抖]()

```js
    function ajax(content) {
  console.log('ajax request ' + content)
}
function debounce(fun, delay) {
  var time;
    return function (args) {
        let that = this
       
        clearTimeout(time)
        time = setTimeout(function () {
          
            fun.call(that, args)
        }, delay)
    }
}
    
let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 500)

inputb.addEventListener('keyup', function (e) {
        debounceAjax(e.target.value)
    })
```

```js
function throttle(func, wait) {
    let  that;
    let oldTime = 0;  // 上一次执行回调的时间戳
    return function (args) {
        that = this;
        
        let time = +new Date(); //当前的触发回调的时间戳
        if (time - oldTime > wait) {
            func.call(that, args);
            // 执行完成后把此次的执行事件赋值给上一次的时间
            oldTime = time; 
        }
    };
}
```

### [闭包](https://juejin.cn/post/6937469222251560990)

```js
一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，闭包可以实现方法和属性的私有化
```



![闭包树形图](D:\note\bibao.png)



### [单线程]()

[引用](https://juejin.cn/post/6844903553795014663#heading-17)

```js
单线程模型指的是JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队待。
同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。

异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务

异步几种模式
回调函数，事件监听，发布订阅

 同步异步执行机制
1、遇到同步代码直接执行
2、遇到异步代码先放一边，并且将他回调函数存起来，存的地方叫事件队列
3、等所有同步代码都执行完，再从事件队列中把存起来的所有异步回调函数拿出来按顺序执行

引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）
```

### [事件循环]()

```js
所有任务都在主线程上执行，形成一个执行栈。
主线程发现有异步任务，就在“任务队列”之中加入一个任务事件。
一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”（先进先出原则）。那些对应的异步任务，结束等待状态，进入执行栈并开始执行。
主线程不断重复上面的第三步，这样的一个循环称为事件循环。
```





### [js工作原理]()

```
1.浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
2.解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
3.如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
4.JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
注意：加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。
```

### [defer属性]()

```js
1.浏览器开始解析 HTML 网页。
2.解析过程中，发现带有defer属性的<script>元素。
3.浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
4.浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
```

### [async 属性]()

```js
1浏览器开始解析 HTML 网页。
2解析过程中，发现带有async属性的script标签。
3浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
4脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
5脚本执行完毕，浏览器恢复解析 HTML 网页。

注意：如果脚本之间没有依赖关系，就使用async属性，如果脚本之间有依赖关系，就使用defer属性。如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定。`async优先级高`
```

### [浏览器核心]()

```js
浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。

渲染引擎四个阶段
1.解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
2.对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
3.布局：计算出渲染树的布局（layout）。
4.绘制：将渲染树绘制到屏幕。
js引擎四个阶段
1读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
2对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
3使用“翻译器”（translator），将代码转为字节码（bytecode）。
4使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。
```



### [回流和重绘]()

[引用](https://juejin.cn/post/6844903569087266823)

```js
重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。
优化技巧
读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
缓存 DOM 信息。
不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
使用documentFragment操作 DOM
动画使用absolute定位或fixed定位，这样可以减少对其他元素的影响。
只在必要时才显示隐藏元素。
使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流。
使用虚拟DOM（virtual DOM）库。
```

### [监听函数]()

```html
1.HTML 的 on- 属性
<div onclick="console.log('触发事件')">
 第一种“HTML 的 on- 属性”，违反了 HTML 与 JavaScript 代码相分离的原则，将两者写在一起，不利于代码分工，因此不推荐使用。
2.元素节点的事件属性
    div.onclick = function (event) {
  console.log('触发事件');
};
    第二种“元素节点的事件属性”的缺点在于，同一个事件只能定义一个监听函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次。因此，也不推荐使用。
 3.EventTarget.addEventListener()
同一个事件可以添加多个监听函数。
能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数。
除了 DOM 节点，其他对象（比如window、XMLHttpRequest等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。
```

### [事件传播]()

[引用](https://juejin.cn/post/6844903834075021326)

```html
第一阶段：从window对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
第三阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）
```

### [事件代理]()

```html
由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）
好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个<li>节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。
    stopPropagation方法只会阻止事件的传播，不会阻止该事件触发<p>节点的其他click事件的监听函数  使用stopImmediatePropagation就不会触发本节点的其它监听函数
```

### [存储方式]()

```html
生命周期：cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效
localStorage：除非被手动清除，否则将会永久保存。
sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。
存放数据大小：cookie：4KB左右
localStorage和sessionStorage：可以保存5MB的信息。
http请求：cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信
易用性：cookie：需要程序员自己封装，源生的Cookie接口不友好
localStorage和sessionStorage：源生接口可以接受，亦可再次封装来对Object和Array有更好的支持
```

### [同源](http://javascript.ruanyifeng.com/bom/same-origin.html)

```html
协议相同，域名相同，端口相同
JSONP
它的基本思想是，网页通过添加一个<script>元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来
优缺点：简单易用,老式浏览器全部支持  只能发GET请求
```

​	

### [CORS]()

```js
CORS 需要浏览器和服务器同时支持。
整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与
CORS 请求分成两类：简单请求和非简单请求。
（1）请求方法是以下三种方法之一。
HEAD,GET,POST
（2）HTTP 的头信息不超出以下几种字段。
简单请求
对于简单请求，浏览器直接发出 CORS 请求。就是在头信息之中，增加一个Origin字段。
非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为“预检”请求。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段
```



### [target]()

```js
Event.currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。

Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点
```



### [json规定]()

```js
复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。

字符串必须使用双引号表示，不能使用单引号。

对象的键名必须放在双引号里面。

数组或对象最后一个成员的后面，不能加逗号。
```

### [json与xml]()

```
https://blog.csdn.net/qq_43067585/article/details/106295657
JSON是一种表示对象的方式；XML是可扩展标记语言。
json便于阅读，可读性较好
json 文件体积更小 
json读写速度更快
json更容易解析
4、JSON不提供对命名空间的任何支持；XML支持名称空间。
5、JSON支持数组；XML不支持数组。
6、XML的文件相对难以阅读和解释；与XML相比，JSON的文件非常易于阅读。
7、JSON不使用结束标记；XML有开始和结束标签。
8、JSON的安全性较低；XML比JSON更安全。
9、JSON不支持注释；XML支持注释。
10、JSON仅支持UTF-8编码；XML支持各种编码
```



### [js继承方式](https://juejin.cn/post/6844903696111763470)

### [this指向](https://juejin.cn/post/6946021671656488991)

### [定时器误差]()

```js
如果当前 执行栈 所花费的时间大于 定时器 时间，那么定时器的回调在 宏任务(macrotask) 里，来不及去调用，所有这个时间会有误差。
```



### [执行上下文](https://segmentfault.com/a/1190000011843356)

```js
https://juejin.cn/post/7096818495450513445
https://juejin.cn/post/7043408377661095967
同一个作用域下，对同一个函数的不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值，所以，作用域中变量的值是在执行过程中确定的，而作用域是在函数创建时就确定的。

如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中找到变量的值。
```

### [垃圾回收机制](https://juejin.cn/post/6981588276356317214)

```js
垃圾是程序不用的内存或者是之前用过了，以后不会再用的内存空间
垃圾产生：引用数据类型是保存在堆内存中，如果把一个数组赋给变量，再把另一个数组赋给变量，那么之前的数组就没有变量去引用就成了无用的对象，无用的对象会存在内存当中，所以要清理这些垃圾
可达性：就是那些以某种方式可访问或者说可用的值，它们被保证存储在内存中，反之不可访问则需回收
两种垃圾回收方式
标记清除算法：大多数浏览器都是采用标记清除，标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁，
优点：通过二进制字符来表示标记，1表示垃圾  0不是垃圾
缺点：在清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了内存碎片
内存碎片化，分配速度慢
引用计数算法
对象引被用一次引用次数就加一，如果对象引用次数为0，就会当成垃圾会被立刻清除
缺点  无法解决循环赋值，
```



### [js基本类型](https://juejin.cn/post/6844904049465098247)



### [ajax原理]()

```js
ajax指的是通过 JavaScript 的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页的一种方法.
ajax原理 ，AJAX 通过原生的XMLHttpRequest对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。XMLHttpRequest对象是 AJAX 的主要接口，用于浏览器与服务器之间的通信。
```

### [js隐式转换](https://juejin.cn/post/6844903557968166926)

