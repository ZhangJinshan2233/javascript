
function currying(fn, args) {
    let len = fn.length;
    args = args || []
    return function () {
        let arg = args.slice();
        let _arg = [...arg, ...arguments]
        if (_arg.length >= len) {
           
            return fn.apply(null, _arg)
        } else {
            return currying.call(null, fn, _arg)
        }
    }
}
function add(a, b, c) {
    return a + b + c;
}
let addcurrying = currying(add)
console.log(addcurrying(1)(2)(3))