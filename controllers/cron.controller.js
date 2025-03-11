const cron = require("node-cron");
const axios = require("axios");
const { formatDate } = require("../utils/formatDate.util.js");

const cronController = async (req, res, next) => {
  /**************  CRON JOB  ***************/
    const cronSchedule = process.env.CRON_SCHEDULE;
    console.log("cronSchedule: ", cronSchedule);
    cron.schedule(cronSchedule, async () => {
        //RUNS EVERY Specified in .env minute
        const date = new Date();
        const timeNow = formatDate(date);
        const URL_TO_FETCH = process.env.URLTOFETCH;
        const FETCH_OWN = process.env.FETCH_OWN;

        console.time("API Fetched time");
        try {
            let { data, status, statusText, headers, config, request } =
                await axios.get(URL_TO_FETCH);
            await axios.get(FETCH_OWN);
            console.log("URL:", URL_TO_FETCH, `\n[Access Time: ${timeNow}]`);
            console.timeEnd("API Fetched time");
            console.log("API Status using AXIOS:\n", {
                status: status,
                statusText: statusText,
                message: "API fetched successfully",
            });
        } catch (error) {
            console.log("URL:", URL_TO_FETCH, `[Access Time: ${timeNow}]`);
            console.timeEnd("API Fetched time");
            console.log({
                status: error.response.status,
                statusText: error.response.statusText,
                message: "API fetch failed",
                headers: error.response.headers,
            });
            return next(error);
            }
    });

    return res.status(200).json({
        status: true,
        message: "Cron Job is running",
        cron: process.env.CRON_SCHEDULE,
    });
};

module.exports = cronController;
