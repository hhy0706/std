class LazyImage {
  constructor(selector) {
    // 懒记载图片列表，将伪数组转为数组，以便可以使用数组的api
    this.imgElements = [...document.querySelectorAll(selector)];
    this.init();
  }
  inViewShow() {
    for (let i = 0; i < this.imgElements.length; i++) {
      const image = this.imgElements[i];
      const rect = image.getBoundingClientRect();
      if (
        rect.top < document.documentElement.clientHeight &&
        rect.top + rect.height >= 0
      ) {
        image.src = image.dataset.src;
        this.imgElements.splice(i, 1);
        i--;
        if (this.imgElements.length == 0) {
          document.removeEventListener("scroll", this.throttleFn);
        }
      }
    }
  }
  // delay = 15,
  throttle(fn, mustRun = 30) {
    let t_start = null;
    // let timer = null;
    // let context = this;
    return function () {
      let t_current = +new Date();
      let args = Array.prototype.slice.call(arguments);
      // clearTimeout(timer);
      // if (!t_start) {
      //   t_start = t_current;
      // }
      if (t_current - t_start > mustRun) {
        fn.apply(this, args);
        t_start = t_current;
      }
      // else {
      //   timer = setTimeout(() => {
      //     fn.apply(context, args);
      //   }, delay);
      // }
    };
  }
  init() {
    // 通过IntersectionObserver api判断图片是否出现在可视区域内，不需要监听Scroll来判断
    if ("IntersectionObserver" in window) {
      let LazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let LazyImage = entry.target;
            LazyImage.src = LazyImage.dataset.src;
            LazyImage.classList.remove("lazy-image");
            LazyImageObserver.unobserve(LazyImage);
          }
        });
      });

      this.imgElements.forEach((element) => {
        LazyImageObserver.observe(element);
      });
    } else {
      this.inViewShow();
      this.throttleFn = this.throttle(this.inViewShow);
      document.addEventListener("scroll", this.throttleFn.bind(this));
    }
  }
}
// 调用例子
new LazyImage(".lazy-image");
// https://juejin.cn/post/6844903801590120462
// https://juejin.cn/post/6844903688390049800
