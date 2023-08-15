/**
 * Promise polyfill 🔥
 */

// Basic promise:
const pr = new Promise((resolve, reject) => resolve(1)).then(data => console.log(`Basic promise ${data}`))

new Promise((res) => setTimeout(() => {
	res(1)
}, 4000)).then(data => `promise chaining ${data}`).then(data => console.log(data))




// promise polyfill

function PromiesPolyfill(executor) {

	let onResolvedChain = []
	let onReject
	let isCalled = false
	let isFulfilled = false
	let isRejected = false
	let value

	function resolve(v) {
		isFulfilled = true;
		value = v;
		if (onResolvedChain.length) {
			isCalled = true;
			onResolvedChain.reduce((acc, fn) => fn(acc), value);
		}
	}

	function reject(v) {
		isRejected = true;
		value = v;
		if (typeof onReject === "function") {
			isCalled = true;
			onReject(value);
		}
	}

	this.then = function (cb) {
		onResolvedChain.push(cb)
		if (isFulfilled && !isCalled) {
			isCalled = true;
			onResolvedChain.reduce((acc, fn) => fn(acc), value);
		}
		return this;
	}


	this.catch = function (cb) {
		onReject = cb
		if (isRejected && !isCalled) {
			isCalled = true;
			onReject(value);
		}
		return this;
	}

	executor(resolve, reject)
}

PromiesPolyfill.resolve = (val) => {
	return new PromiesPolyfill(function executor(resolve) {
		resolve(val)
	})
}

PromiesPolyfill.reject = (reason) => {
	return new PromiesPolyfill(function executor(resolve, reject) {
		reject(reason)
	})
}

PromiesPolyfill.all = (promises) => {
	let fulfilledPromises = [];
	result = [];

	function executor(resolve, reject) {
		promises.forEach((promise, index) => {
			promise
				.then((val) => {
					fulfilledPromises.push(true);
					result[index] = val;
					if (fulfilledPromises.length === promises.length) {
						return resolve(result)
					}
				}).catch((reason) => {
					return reject(reason);
				})
		})
	}
	return new PromiesPolyfill(executor);
}

const race = (promises) => {
	return new Promise((resolve, reject) => {
		promises.forEach(promise => {
			promise
				.then(resolve)
				.catch(reject)
		})
	})
}

const allSettled = (promises) => {
	let mappedPromises = promises.map((p) => {
		return p.then((value) => {
			return {
				status: 'fulfilled',
				value,
			};
		})
			.catch((reason) => {
				return {
					status: 'rejected',
					reason,
				};
			});
	});
	return Promise.all(mappedPromises);
};

function any(promises) {
  let results = [];
  var counter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then((result) => {
        resolve(result)
      }).catch((err) => {
         results.push(err);
         ++counter;
        if (counter === promises.length) {
          reject(results);
        }
      });
    });
  });
};

allSettled([
	Promise.resolve(20),
	Promise.resolve(40),
	// new PromiesPolyfill(res => setTimeout(() => {
	// 	res(10)
	// }, 1000)),
	Promise.reject("Reject all"),
	Promise.resolve(50),
]).then(data => console.log(`allSettled`, data))
	.catch(reason => console.error(`allSettled`, reason))

race(
	[
		PromiesPolyfill.resolve(20),
		PromiesPolyfill.resolve(40),
		// new PromiesPolyfill(res => setTimeout(() => {
		// 	res(10)
		// }, 1000)),
		// PromiesPolyfill.reject("Reject all"),
		PromiesPolyfill.resolve(50),
	]
).then(data => console.log(`promise polyfill race - ${data}`))
	.catch(reason => console.error(`promise polufill race - ${reason}`))


Promise.race(
	[
		Promise.resolve(20),
		Promise.resolve(40),
		// new PromiesPolyfill(res => setTimeout(() => {
		// 	res(10)
		// }, 1000)),
		// PromiesPolyfill.reject("Reject all"),
		Promise.resolve(50),
	]
).then(data => console.log(`promise race - ${data}`))
	.catch(reason => console.error(`promise race - ${reason}`))


const myPr = new PromiesPolyfill(res => {
	console.log("bla bla start");
	res(2)
	console.log("bla bla end");
})
myPr.then(data => console.log(`sync promise polyfill response ${data}`))

new PromiesPolyfill((res, rej) => rej(`sync promise polyfill is rejected`)).catch(data => console.error(data));

new PromiesPolyfill(res => setTimeout(() => res(3), 2000)).then(data => console.log(`async promise polyfill response ${data}`))

new PromiesPolyfill((res, rej) => setTimeout(() => rej(`async promise polyfill is rejected`), 2000))
	.catch(data => console.error(data))

new PromiesPolyfill((res) => setTimeout(() => {
	res(4)
}, 4000)).then(data => `promise polyfill chaining ${data}`).then(data => console.log(data))


PromiesPolyfill.resolve(10).then(data => console.log(data))
PromiesPolyfill.resolve(() => console.log("promise resolve")).then(res => res());

PromiesPolyfill.reject("promise polyfill rejected").catch(data => console.error(data));

PromiesPolyfill.all([
	PromiesPolyfill.resolve(20),
	PromiesPolyfill.resolve(40),
	new PromiesPolyfill(res => setTimeout(() => {
		res(10)
	}, 1000)),
	PromiesPolyfill.reject("Reject all"),
	PromiesPolyfill.resolve(50),
]).then(data => console.log('promise polyfill all', data))
	.catch(data => console.error(data))
