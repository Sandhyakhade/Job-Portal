import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Provide Job Title'],
        trim: true,
        maxlength: [100, 'Job Title can not exceed 100 characters'],
    },
    company: {
        type: String,
        required: [true, 'Please Provide Company Name'],
        trim: true,
        maxlength: [100, 'company name can not exceed 100 characters'],
    },
    location: {
        type: String,
        required: [true, 'Please provide the job location'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide detailed job description'],
    },
    requirements: {
        type: [String],
        required: [true, 'Please provide requirements or skills'],
    },
    jobType: {
        type: String,
        enum: {
            values: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
            message: `${VALUE} is not valid job type`,
        },
        default: 'Full-Time'
    },
    workmode: {
        type: String,
        enum: {
            values: ['On-Site', 'Romote', 'Hybrid'],
            message: `${VALUE} is not valid type`,
        },
        default: 'On-Site'
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
            default: 'INR',
        },

    },
    experienceLevel: {
        type: String,
        enum: ['Fresher', 'Junior', 'Mid-Level', 'Senior'],
        default: 'Fresher',
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reuired: [true, 'Job must belong to an employer'],
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open',
    },
},
    {
        timestamps: true,
    }
);

jobSchema.index({ title: 'text', company: 'text', location: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job