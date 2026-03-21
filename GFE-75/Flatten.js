/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
    let newArr = [];

    value.forEach((item) => {
        if (Array.isArray(item)) {
            newArr = newArr.concat(flatten(item));
        } else {
            newArr.push(item);
        }
    });

    return newArr;
}

// use concat here so that you dont omitt the rest of the array values while pushing to new array