class Scheduler {
    constructor(max) {
        this.max = max
        this.count = 0
        this.queue = []
    }
    add(p) {
        this.queue.push(p)
        this.start()
    }
    start() {
        if (this.count >= this.max || !this.queue.length) return
        this.count++
        this.queue.shift()().finally(() => {
            this.count--
            this.start()
        })
    }
}
