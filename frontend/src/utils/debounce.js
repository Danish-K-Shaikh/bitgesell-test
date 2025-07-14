/**
 * Debounce function: delays invoking `fn` until after `wait` ms have elapsed since the last call.
 * @param {Function} fn - Function to debounce.
 * @param {number} wait - Delay in milliseconds.
 * @returns {Function}
 */
export default function debounce(fn, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}