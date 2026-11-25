import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Job Title"],
      trim: true,
      maxlength: [100, "Job Title cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Please provide Company Name"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Please provide the job location"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide detailed job description"],
    },
    requirements: {
      type: [String],
      required: [true, "Please provide requirements or skills"],
    },
    jobType: {
      type: String,
      enum: {
        values: ["Full-Time", "Part-Time", "Contract", "Internship"],
        message: "{VALUE} is not a valid job type",
      },
      default: "Full-Time",
    },
    workmode: {
      type: String,
      enum: {
        values: ["On-Site", "Remote", "Hybrid"],
        message: "{VALUE} is not a valid work mode",
      },
      default: "On-Site",
    },
    salary: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-Level", "Senior"],
      default: "Fresher",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Job must belong to an employer"],
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({ title: "text", company: "text", location: "text" });

const Job = mongoose.model("Job", jobSchema);

export default Job;
