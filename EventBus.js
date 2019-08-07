class EventEmitter {
    constructor() {
        this.events = this.events || new Map()
    }
    /**
     * listen event
     */
    addListener(type,fn){
       if(!this.events.get(type)) {
           this.events.set(type,fn)
       }
    }

    /**
     * emit event
     */
    emit(type){
        let handler=this.events.get(type)
        
        handler.apply(this,[...arguments].slice(1))
    }
}

// test
let emitter = new EventEmitter()
console.log(emitter)
// listen envent
emitter.addListener('ages', age => {
  console.log(age)
})
//emit envent
emitter.emit('ages', 18)  // 18