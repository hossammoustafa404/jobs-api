const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("../errors/customApiError");
const Job = require("../models/job");

// Create job
const createJob = async (req, res, next) => {
  const { company, position } = req.body;

  const job = await Job.create({ ...req.body, createdBy: req.user.id });

  res.status(StatusCodes.CREATED).json({ job });
};

// Get all jobs
const getAllJobs = async (req, res, next) => {
  const {
    user: { id: userId },
  } = req;

  const jobs = await Job.find({ createdBy: userId }).sort("-createdAt");
  res.status(StatusCodes.OK).json({ jobs });
};

// Get a job
const getJob = async (req, res, next) => {
  const {
    params: { jobId },
    user: { id: userId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  res.status(StatusCodes.OK).json({ job });
};

// Update job
const updateJob = async (req, res, next) => {
  const {
    params: { jobId },
    user: { id: userId },
  } = req;

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ job });
};

// Delete job
const deleteJob = async (req, res, next) => {
  const {
    params: { jobId },
    user: { id: userId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  res.status(StatusCodes.OK).send();
};

// Delete all jobs
const deleteAllJobs = async (req, res, next) => {
  const {
    user: { id: userId },
  } = req;

  await Job.deleteMany({ createdBy: userId });

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  deleteAllJobs,
};
