/**
 * first method
 */
function deepClone1(obj) {

    return JSON.parse(JSON.stringify(obj));
}

/**
 * second method
 */
function deepClone2(obj) {

    let copy = obj instanceof Array ? [] : {};

    for (let key in obj) {
        if (Reflect.has(obj, key)) {
            copy[key] = typeof obj[key] === 'object' ? deepClone2(obj[key]) : obj[key]
        }
    }
    return copy
}

//test
let obj = [1, , 3]
console.log(deepClone2(obj))