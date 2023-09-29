require('dotenv').config();
const cron = require('node-cron')
const axios = require('axios');

const { formatDate } = require("./formatDate")


/**************  CRON JOB  ***************/
const cronSchedule = process.env.CRON_SCHEDULE
cron.schedule(cronSchedule, async () => {   //RUNS EVERY Specified in .env minute
const date = new Date();
const timeNow = formatDate(date)

const URL_TO_FETCH = process.env.URLTOFETCH

console.time('API Fetched time')
try {
    let {data, status, statusText, headers, config, request}  = await axios.get(URL_TO_FETCH)
    console.log('URL:', URL_TO_FETCH, `[Access Time: ${timeNow}]`);
    console.timeEnd('API Fetched time')
    console.log('API Status using AXIOS:\n',{
        Status: [status,statusText]
    });
    } catch (error) {
        console.log('URL:', URL_TO_FETCH, `[Access Time: ${timeNow}]`);
        console.timeEnd('API Fetched time')
        console.log({
            Status:[error.response.status,error.response.statusText]})
    }
})

