1. [清除浮动](#clear)
2. [盒子模型](#border)
3. [文本溢出](#ellipsis)
4. [伪类伪元素区别](#prepend)
5. [flex](#flex)
6. [水平垂直居中](#center)
7. [两栏与三栏](https://www.cnblogs.com/fazero/p/11448485.html)
8. [权重](#weight)
9. [html5新特性](#feature)
### <a id="clear">清除浮动</a>
1. 在浮动元素的父元素上加`overflow:hidden`（推荐），优点：简单直接，缺点：会溢出隐藏，如果出现下拉或弹层的情况会出现问题。

2. 在父元素下加子元素，这个子元素必须是块级，然后设置它的样式`clear: both`，可清除浮动。优点：不会裁切，缺点：要多加一个空元素。

3. `after`伪元素清除浮动（万能清除浮动），优点：兼容性好，不会溢出隐藏，不用额外加元素，缺点：代码稍微多些。
 ``` html 
  .box::after{
  display: block;
  content: " ";
  clear: both;
  font-size: 0;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
 ```
### <a id="border">盒子模型</a>
IE盒子模型的width和height包括了border、padding和content，而`w3c`标准的只包含了content。

### <a id="ellipsis">溢出省略</a>
1. 单行 
``` html 
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
```
2. 多行
```html 
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
```
### <a id="prepend">伪类伪元素区别</a>
1. 伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素
2. 伪元素用于创建一些不在文档树中的元素并为其添加样式。
3. `CSS` 伪类是添加到选择器的关键字，指定要选择的元素的特殊状态
 ### <a id="flex">flex</a>
 [flex几个值的区别](https://juejin.cn/post/7061196914741477383)  
[flex知识](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### <a id="center">水平垂直居中</a>
在D盘note文件（https://juejin.cn/post/6844903982960214029）

### [选择器](https://blog.csdn.net/weixin_62255399/article/details/126030848)

```js
.susu ~p 是 它后面所有的兄弟加样式
.susu +p 是它紧接着的后一个兄弟加样式
```



### <a id="weight">权重</a>
| 选择器  |  权重值 |
|   -    |    -     |
|   !important    |    最大     |
| 内联样式         |  1000 |
| id               |  100   |
| 属性选择器、类，  伪类、 |  10 |
| 标签选择器、伪元素选择器 |  1 |
| 配符、子选择器、相邻选择器 |  0 |
| 浏览器默认 |  没有权限 |

### <a id="feature">html5新特性</a>
1. 新元素
2. 新属性
3. 完全支持 `CSS3`
4. `Video` 和 `Audio`
5. `2D`/`3D` 制图
6. 本地存储
7. 本地 `SQL` 数据
8. `Web` 应用

### <a id="gap">行块间隙</a>

[引用](https://juejin.cn/post/7078969860545314824)

1. 移除空格
2. 使用margin负值
3. 使字体为0
4. letter-spacing 和word-spacing

### <a id="bfc">bfc</a>
[bfc](https://www.itcast.cn/news/20201016/16152387135.shtml)

### [三大隐藏]()

1.`opacity：0`，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定 一些事件，如click 事件，那么点击该区域，也能触发点击事件的

2.`visibility：hidden`，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已 经绑定的事件 ，隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

3.`display：none`，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素。 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）但是不会触发该元素已 经绑定的事件

### [语义化]()

1. HTML5的语义化指的是`合理正确的使用语义化的标签来创建页面结构`
2. **语义化的优点**:
   - 在`没CSS样式的情况下，页面整体也会呈现很好的结构效果`
   - `代码结构清晰`，易于阅读，
   - `利于开发和维护` 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
   - `有利于搜索引擎优化（SEO）`，搜索引擎爬虫会根据不同的标签来赋予不同的权重

### [响应式](https://juejin.cn/post/6844903814332432397)

### [性能优化](https://juejin.cn/post/6892994632968306702)

### [iframe]()

```js
优点:
1.iframe能够把嵌入的网页原样展现出来；

2.模块分离，便于更改，如果有多个网页引用iframe，只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷；
3.网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，增加代码的可重用；
4.如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决；
5.重载页面时不需要重载整个页面，只需要重载页面中的一个框架页；
6.方便制作导航栏。
3. 可实行局部刷新
缺点：
1. 样式/脚本需要额外链入，会增加请求
2. 框架结构有时会让人感到迷惑，滚动条除了会挤占有限的页面空间外会使iframe布局混乱，还会分散访问者的注意力，影响用户体验。
3. 影响搜索引擎优化
4. 移动设备无法完全显示框架，设备兼容性差
5. 阻塞页面加载，影响网页加载速度
```

### [行与块](https://www.itcast.cn/news/20210802/15282148623.shtml)

### [两栏](https://www.cnblogs.com/fazero/p/11448485.html)

### [大小写]()

camelCase 第一个单词首字母小写 其他单词首字母大写

kebab-case 单词小写 单词连线

PascalCase 全部大写

### [link与import]()

```js
 link属于HTML标签，而@import是CSS提供的

2） 页面被加载的时候，link中的资源会同时被加载，而@import中的资源会等到引用它的CSS文件被加载完再加载

3） import只在IE5以上才能识别，而link是HTML标签，无兼容问题

4） link方式的样式的权重高于@import的权重.
5)  link的样式可以用于javascript改变样式而improt不可以
```

### [div布局与table布局区别]()

```js
div布局页面加载速度更快
div布局符合w3c标准，结构表现分离
table布局嵌套太多结构复杂，用户体验差
```

### [a标签顺序]()

```js
a:link、a:visited、a:hover、a:active
```

### [动画]()

```js
`animation` 和 `transtion`的区别：
transtion
只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态
1. `transition` 需要触发事件，比如点击事件、鼠标移入事件；而 `animation`可以配合 `@keyframe` 可以不触发事件就触发这个动画

2. `transition` 触发一次播放一次；而 `animation` 则是可以设置很多的属性，比如循环次数，动画结束的状态等等；

3. `transition`关注的是样式属性的变化，而`animation`作用于元素本身使用关键帧的概念，实现更自由的动画效果；

4. `transition`动画比`animation`性能开销要低，不会引起页面重排。
```



### [css继承属性](https://www.jianshu.com/p/34044e3c9317)

### [三角形]()

```css
div{
    		width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-right: 100px solid transparent;
            border-top: 100px solid red;
}
//或者
.triangle{
  margin: 100px;
  width: 160px;
   height: 200px;
   background-color: skyblue;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
}
```

### 

### [doctype作用](https://www.cnblogs.com/LeoCharlie/p/12303861.html)



### [z-index](https://juejin.cn/post/6844903667175260174)