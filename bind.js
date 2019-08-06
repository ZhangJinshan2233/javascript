Function.prototype.myBind = function (context) {
    if (typeof this !== 'function')
        throw new TypeError('not function')

    const self = this;
    const args = [...arguments].slice(1)
    return function F() {
        if (self instanceof F) {
            return new self(...args, ...arguments)
        } else {
            return self.apply(context, args.concat(...arguments))
        }
    }

}