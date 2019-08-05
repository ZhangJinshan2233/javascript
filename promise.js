class myPromise {
    constructor(executor) {

        if (!isFunction(executor)) {
            throw new Error('myPromise must accept a function')
        }
        this._state = 'pending';
        this._value = undefined;
        this._reason = undefined;
        this._fullfilledQueues = [];
        this._rejectedQueues = [];


        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }

    _resolve(val) {
        if (this._state !== 'pendding') return;

        /**
         * execute functions of queue
         */
        const run = () => {
            this._state = 'fullfilled';
            this._value = val;
            const runFullfilled = (value) => {
                let cb;
                while (cb = this._fullfilledQueues.shift()) {
                    cb(val)
                }
            }
            const runRejected = (value) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(err)
                }
            }
        }

        /**
         * if the argument of resolve function is object of Promise,
         * the status of current promise won't change until that of
         * previous object of Promise,and the status of
         *  current promise depend on promise argument
         * 
         */
        if (val instanceof myPromise) {
            val.then(value => {
                this._value = value;
                this._state = 'fullfilled';
                runFullfilled(value)
            }, err => {
                this._value = err;
                this._state = 'rejected';
                runRejected(err)
            })
        } else {
            this._value = value;
            this._state = 'fullfilled';
        }
        /**
         * support synchonzation
         */
        setTimeout(run, 0);
    };

    _reject(err) {
        if (this._state !== 'pendding') return;
        const run = () => {
            this._state = 'rejected';
            this._value = err
            let cb
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }

        setTimeout(run, 0)
    }
    then(onFullfilled, onRejected) {

        const {
            _value,
            _status
        } = this
        switch (_status) {

            case 'pending':
                this._fullfilledQueues.push(onFullfilled)
                this._rejectedQueues.push(onRejected)
                break
            case 'fullfilled':
                onFullfilled(_value)
                break;

            case 'rejected':
                onRejected(_value);
                break

        }

        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            /**
             * encapsulate a function which will be executed in succeeding
             */
            let fullfilled = value => {
                try {
                    if (!isFunction(onFullfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFullfilled(value)
                        if (res instanceof myPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(err)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }

            let rejected = error => {
                try {
                    if (isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        res = onRejected(error)
                        if (res instanceof mypromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
        })
    }

    catch (onRejected) {
        return this.then(undefined, onRejected)
    }

    /**
     * add static methods
     */
    static resolve(value) {
        if (value instanceof myPromise) return value;
        return new myPromise(resolve => resolve(value))
    }

    static reject(value) {
        return new myPromise((resolve, reject) => {
            reject(value)
        })
    }

    static all(list) {
        return new myPromise((resolve, reject) => {
            /**
             * return the of returned value
             */
            let values = [];
            let count = 0;
            for (let [i, p] of list.entries()) {
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++;
                    if (count == list.length) resolve(values)
                },err=>{
                    reject(err)
                })
            }
        })

    }

    static race(list){
        return new myPromise((resolve,reject)=>{
            for (let p of list){
                this.resolve(p).then(res=>{
                    resolve(res)
                },err=>{
                    reject(err)
                })
            }
        })
    }

    finally(cb){
        return this.then(value=>myPromise.resolve(cb()).then(()=>value),
        reason=>myPromise.resolve(cb()).then(()=>{throw reason})
        )
    }
}