function create() {
    // create new object
    let obj = {};

    //get first argument and shift it

    let Con = Array.prototype.shift.call(arguments)
    
    obj.__proto__ = Con.prototype;
    //bind this and implement inheritance, obj have access to properties of constructor
    var ret = Con.apply(obj, arguments);
    //return 
    return ret instanceof Object ? ret : obj;
};

//test
function Car(color) {
    this.color = color;
}
Car.prototype.start = function () {
    console.log(this.color + " car start");
}

var car = create(Car, "black");
car.color;
// black

car.start();