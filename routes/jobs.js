const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
  deleteAllJobs,
} = require("../controllers/jobs");
const jobsRouter = express.Router();

jobsRouter.route("/").post(createJob).get(getAllJobs).delete(deleteAllJobs);
jobsRouter.route("/:jobId").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;
