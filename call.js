Function.prototype.myCall = function (context) {
    if (typeof this !== 'function')
        throw new TypeError('not function');
     context = context || global;
    let arg = [...arguments].slice(1)
    context.fn = this;
    let result = context.fn(...arg)
    delete context.fn
    return result

}
