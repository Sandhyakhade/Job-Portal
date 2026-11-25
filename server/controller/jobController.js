import Job from "../models/Job.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      description,
      requirements,
      jobType,
      workmode,
      salary,
      experienceLevel,
    } = req.body;

    if (!title || !company || !location || !description || !requirements) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide title, company, location, description, and requirements",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      requirements,
      jobType,
      workmode,
      salary,
      experienceLevel,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllJobs = async (req, res, next) => {
  try {
    const { keyword, location, jobType, workmode, experienceLevel } = req.query;

    const query = { status: "Open" };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (workmode) {
      query.workmode = workmode;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};
