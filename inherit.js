/**
 * prototype inheritance
 * sub object will share the property of reference parent object
 * can not pass parameter when create child object
 */
function Parent() {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin
/**
 * constructor inheritance
 * 
 */


function Parent1() {
    this.names = ['kevin', 'daisy'];
}

function Child1() {
    Parent1.call(this);
}

var child1 = new Child1();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child1();

console.log(child2.names); // ["kevin", "daisy"]

/**
 * compound mode inheritance
 */

function compoundModeParent(name) {
    this.name = name
}

compoundModeParent.prototype.getName = function () {
    console.log(this.name)
}

function compoundModeChild(name) {
    compoundModeParent.call(this, name)
}

compoundModeChild.prototype = new compoundModeParent();

/**
 * parasitic mode inheritance
 */
function parasiticModeChild(o) {
    let clone = Object.create(o)
    clone.sayName = function () {
        console.log('hi');
    }
    return clone
}

/**
 * parasitic and compuound inheritance
 */

function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = Object.create(Parent.prototype)


var child1 = new Child('kevin', '18');

console.log(child1);
