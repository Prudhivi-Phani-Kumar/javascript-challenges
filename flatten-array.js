// Flatten an array using reduce:
const flattenArray = (ar) => {
    return ar.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc = acc.concat(flattenArray(item))
        } else {
            acc.push(item)
        }
        return acc
    }, [])
}

// Flatten an array using map:
const flattenArrayUsingMap = (ar) => {
    let flattenedList = [];
    ar.map(item => {
        if (Array.isArray(item)) {
            flattenedList = flattenedList.concat(flattenArrayUsingMap(item))
        } else {
            flattenedList.push(item)
        }
    })
    return flattenedList
}

console.log(flattenArray([[1, 2, 3], [4], 5, 6, [[[7]]]]))
console.log(flattenArray1([[1, 2, 3], [4], 5, 6, [[[7]]]]))