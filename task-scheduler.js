// Task-Scheduling:

const taskScheduler = [
	{ id: "a", dependencies: ["b", "c"] },
	{ id: "b", dependencies: ["d"] },
	{ id: "c", dependencies: ["e"] },
	{ id: "d", dependencies: [] },
	{ id: "e", dependencies: ["f"] },
	{ id: "f", dependencies: [] },
]


const schedule = (taskScheduler) => {
	const totalTasks = taskScheduler.length
	let totalTasksExecuted = 0;
	let currentTask = 0;

	let scheduleLineUp = []

	const removeTaskFromDeps = (id) => {
		taskScheduler.forEach((task) => {
			const index = task.dependencies.indexOf(id)
			if (index !== -1) task.dependencies.splice(index, 1)
		})
	}

	const execute = () => {
		while (totalTasksExecuted < totalTasks) {
			const task = taskScheduler[currentTask]
			if (!task.dependencies.length && !task.executed) {
				console.log(task.id)
				scheduleLineUp.push(task.id)
				task.executed = true
				totalTasksExecuted += 1
				removeTaskFromDeps(task.id)
			} else if (!task.visited) {
				task.visited = 1
			} else if (task.visited > totalTasks) {
				console.log("Cycle Formed")
				scheduleLineUp = "Cycle Formed"
				break
			} else {
				task.visited += 1
			}

			if (currentTask === totalTasks - 1) {
				currentTask = 0
			} else { currentTask += 1 }
		}
	}
	execute()
	console.log(taskScheduler)
	return scheduleLineUp
}

console.log(schedule(taskScheduler));
