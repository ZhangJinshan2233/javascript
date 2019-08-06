function instanceOf(left, right) {

    let leftObj = left.__proto__;
    let rightObj = right.prototype;

    //iterate the __proto__ of left side check if some of __proto__ equal to 
    //right.prototype

    while (true) {
        if (left == null)
            return false

        if (leftObj === rightObj)
            return true

        leftObj=leftObj.__proto__
    }
}