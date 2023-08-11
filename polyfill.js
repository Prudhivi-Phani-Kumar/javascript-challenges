/**
 * Polyfill 😍
 * for Map, filter, reduce,
 * call, bind, apply
 * */

// Map polyfill:
Array.prototype.mapPolyfill = function (cb) {
	let newAr = [];
	for (let i = 0; i < this.length; i++) {
		newAr.push(cb(this[i]));
	}
	return newAr
}

console.log(ar.mapPolyfill((i) => i * i));

//Filter polyfill:
Array.prototype.filterPolyfill = function (cb) {
	let newAr = [];
	for (let i = 0; i < this.length; i++) {
		if (cb(this[i])) {
			newAr.push(this[i]);
		}
	}
	return newAr
}

console.log(ar.filterPolyfill((i) => i > 20));

//Reduce polyfill
Array.prototype.reducePolyfill = function (cb, acc) {
	for (let i = 0; i < this.length; i++) {
		if (acc !== undefined) {
			acc = cb(acc, this[i])
		} else {
			acc = this[i];
		}
	}
	return acc
}

console.log(ar.reducePolyfill((a, i) => a + i, 30));
console.log(ar.reducePolyfill((a, i) => ({ ...a, [i]: i }), {}));


const ob = {
	name: "user",
}

function userInfo(role) {
	console.log(`${this.name} is a ${role}`)
}

//Call polyfill
Function.prototype.callPolyfill = function (context = {}, ...args) {
	if (typeof this !== "function") throw new Error(this + "is not a function")

	context.fn = this;
	context.fn(...args);
}
userInfo.call(ob, "Jr. developer")
userInfo.callPolyfill(ob, "Sr. Developer")

//Apply polyfill
Function.prototype.applyPolyfill = function (context = {}, args = []) {
	if (typeof this !== "function") throw new Error(this + "is not a function")

	if (!Array.isArray(args)) throw new Error("CreateListFromArrayLike called on non-object")
	context.fn = this;
	context.fn(...args);
}
userInfo.apply(ob, ["Lead"])
userInfo.applyPolyfill(ob, ["Lead Developer"])

//Bind polyfill
Function.prototype.bindPolyfill = function (context = {}, ...args) {
	if (typeof this !== "function") throw new Error(this + "cannot be bound as it's not callable")

	context.fn = this;
	return function (...arg) {
		return context.fn(...args, ...arg);
	}
}
userInfo.bind(ob, "Manager")()
userInfo.bindPolyfill(ob, "Sr. Manager")()

