require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");
const express = require("express");
const logger = require("morgan");
const app = express();
const { formatDate } = require("./formatDate");
const { default: scheduleTask } = require("./utils/cron.util");
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.get("/cron", (req, res) => {
  /**************  CRON JOB  ***************/
  const cronSchedule = process.env.CRON_SCHEDULE;
  console.log('cronSchedule: ', cronSchedule);
  //   cron.schedule(cronSchedule, async () => {
  //     //RUNS EVERY Specified in .env minute
  //     const date = new Date();
  //     const timeNow = formatDate(date);
  //     const URL_TO_FETCH = process.env.URLTOFETCH;
  //     const FETCH_OWN = process.env.FETCH_OWN;

  //     console.time("API Fetched time");
  //     try {
  //       let { data, status, statusText, headers, config, request } =
  //         await axios.get(URL_TO_FETCH);
  //       await axios.get(FETCH_OWN);
  //       console.log("URL:", URL_TO_FETCH, `[Access Time: ${timeNow}]`);
  //       console.timeEnd("API Fetched time");
  //       console.log("API Status using AXIOS:\n", {
  //         Status: [status, statusText],
  //       });
  //     } catch (error) {
  //       console.log("URL:", URL_TO_FETCH, `[Access Time: ${timeNow}]`);
  //       console.timeEnd("API Fetched time");
  //       console.log({
  //         Status: [error.response.status, error.response.statusText],
  //       });
  //     }
  //   });

  scheduleTask(cronSchedule, async () => {
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
      console.log("URL:", URL_TO_FETCH, `[Access Time: ${timeNow}]`);
      console.timeEnd("API Fetched time");
      console.log("API Status using AXIOS:\n", {
        Status: [status, statusText],
      });
    } catch (error) {
      console.log("URL:", URL_TO_FETCH, `[Access Time: ${timeNow}]`);
      console.timeEnd("API Fetched time");
      console.log({
        Status: [error.response.status, error.response.statusText],
      });
    }
  });

  res.send("ok");
});

app.get("/", (req, res) => {
  res.status(200).send(`<h2>Running Good 🎉</h2>`);
});

app.listen(PORT, () => {
  console.log(`\nListening all requests on port ${PORT}`);
});
