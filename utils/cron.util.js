const cron = require("node-cron");

/**
 * Schedule a task using a cron pattern with built-in error handling.
 *
 * @param {string} pattern - The cron pattern string.
 * @param {Function} taskFn - The function to execute. Can be async.
 * @param {object} [options={}] - Optional settings for node-cron (e.g. scheduled, timezone).
 * @returns {cron.ScheduledTask} - The scheduled task instance.
 *
 * @throws {Error} If the provided cron pattern is invalid.
 */
function scheduleTask(pattern, taskFn, options = {}) {
  // Validate the cron pattern
  if (!cron.validate(pattern)) {
    throw new Error(`Invalid cron pattern: "${pattern}"`);
  }

  // Wrap the provided function to handle errors gracefully
  const wrappedTask = async () => {
    try {
      // Await taskFn in case it's asynchronous
      await taskFn();
    } catch (error) {
      console.error(`Error executing task for pattern "${pattern}":`, error);
    }
  };

  // Schedule the task using node-cron and return the task instance
  const scheduledTask = cron.schedule(pattern, wrappedTask, options);

  return scheduledTask;
}

module.exports = scheduleTask;
