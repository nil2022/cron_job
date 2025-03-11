require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();
const cronRouter = require("./routes/cron.route.js");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use("/api", cronRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to Cron Job",
    cron: process.env.CRON_SCHEDULE,
  });
});

app.listen(PORT, () => {
  console.log(`\nListening all requests on port ${PORT}`);
});
