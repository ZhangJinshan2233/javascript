let obj = {};
let input = document.getElementsByName('input');
let span = document.getElementsByTagName('span');

Reflect.defineProperty(obj,'text',{
    configurable:true,
    enumerable:true,
    writtable:true,
    get(){
        console.log('get data')
    },
    set(newVal){
        console.log('update data')
        input.value=newVal;
        span.innerHTML=newVal
    }
})

input.addListener('keyup',function(e){
    obj.text=e.target.value
})

