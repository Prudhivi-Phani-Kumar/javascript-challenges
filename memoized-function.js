//Memoized function in JS:
const memoized = (fn) => {
	const cache = {}
	return (...args) => {
		console.log(fn, args);
		const argsToString = JSON.stringify(args);
		if (argsToString in cache) {
			console.log(`fetching data from cache for args: ${argsToString}`);
			return cache[argsToString]
		} else {
			console.log(`computing data for args: ${argsToString}`);
			const res = fn.apply(this, args)
			cache[argsToString] = res
			return res
		}
	}
}

const addNum = (a, b, c) => a + b + c

const add = memoized(addNum)
console.log(add(1, 2, 3));
console.log(add(1, 2, 3));
console.log(add(1, 2, 3));

const factorial = memoized((x) => {
	if (x === 0) return 1;
	return x * factorial(x - 1);
})

console.log(factorial(5));
console.log(factorial(6));
console.log(factorial(3));
