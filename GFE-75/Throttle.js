/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */

// throttle implementation
export default function throttle(func, wait) {
    let flag = true;

    return function (...args) {
        if (flag) {
            flag = false
            func.apply(this, args)
            setTimeout(() => {
                flag = true
            }, wait)
        }
    }
}