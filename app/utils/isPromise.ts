/**
 * Determine whether the given `promise` is a Promise.
 *
 * @param {*} promise
 *
 * @returns {Boolean}
 */

export function isPromise(promise: any): boolean {
  return !!promise && typeof promise.then === "function";
}
