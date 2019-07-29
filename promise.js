class myPromise {
    constructor(executor) {
        
        if (!isFunction(executor)) {
            throw new Error('myPromise must accept a function')
        }
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }

    _resolve(value) {
        if (this.state !== 'pendding') return
        this.state = 'fullfilled';
        this.value = value
    };

    _reject(err) {
        if (this.state !== 'pendding') return
        this.state = 'rejected';
        this.reason = err
    }

}