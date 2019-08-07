/**
 * it will be triggered on time in specified time
 */
function throttle(fn, waite) {
    //use closure to preserve time
    let pre = Date.now()
    return function () {
        let now = Date.now()
        let context = this;
        if ((now - pre) >= waite) {
            fn.apply(this, arguments)
            pre = Date.now()
        }
    }
}