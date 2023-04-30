/**
 * Sleeps for passed amount in miliseocnds
 * @param {number} timeToSleep - Time to Sleep in miliseconds.
 * @returns {Promise} - Returns a promise to sleep.
 */
export const sleepForX = async (timeToSleep) => {
	return new Promise(resolve => setTimeout(resolve, timeToSleep))
}