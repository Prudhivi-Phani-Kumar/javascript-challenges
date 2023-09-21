const obj = {
    A: "12",
    B: 34,
    C: {
        D: 56,
        E: {
            F: 78
        },
        G: [9, 10]
    }
}

function flattenObject(ob, parent) {
    const flattenedObject = {}
    const generateFlatObject = (ob, parent) => {
        for (key in ob) {
            const newParent = parent+key
            const value = ob[key]
            if(typeof value === "object") {
                generateFlatObject(value, newParent+".")
            } else {
                flattenedObject[newParent] = value
            }
        }
    }
    generateFlatObject(ob, parent)
    return flattenedObject
}

console.log(flattenObject(obj, ""))