const getDOMPathFromChildToParent = (parent, child) => {
	let currentNode = child
	const pathToChildNode = []

	while(currentNode !== parent) {
		const parentElement = currentNode.parentElement
		const childrenArray = Array.from(parentElement.children)
		pathToChildNode.push(childrenArray.indexOf(currentNode))
		currentNode = parentElement
	}
	return pathToChildNode
}

const getNodeValue = (parent, path) => {
	let currentNode = parent

	while(path.length) {
		currentNode = currentNode.children[path.pop()]
	}
	return currentNode.innerText
}

const findNodeValue = () => {
	const rootA = document.getElementById("rootA")
	const rootB = document.getElementById("rootB")
	const nodeA = document.getElementById("nodeA")

	const domPath = getDOMPathFromChildToParent(rootA, nodeA)
	return getNodeValue(rootB, domPath)
}

console.log(findNodeValue());


/**
 * Finding the dom element from a similar dom structure:
 * 
 * First get the path from the inner element to the parent node element
 *	1. from the current node get the nearest parent element
 *	2. get the children's from that parent node - and find the index of the exact currentNode and push it to an array
 *	3. repeat the process till we reach the parent node.
 *
 * Use the path to find the node value of the siminal dom node structure
 */
