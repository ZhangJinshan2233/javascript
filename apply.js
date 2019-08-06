Function.prototype.myApply = function (context) {
    if (typeof this !== 'function')
        throw new TypeError('not function')
    context = context || global;
    let args = [...arguments].slice(1)
    context.fn = this;
    let result = context.fn(args)
    delete context.fn
    return result
}
