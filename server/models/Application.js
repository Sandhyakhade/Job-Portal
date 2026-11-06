import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Application must be associated with a Job'],
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Application must belong to an Applicant'],
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Application must reference an employer'],
    },
    resume: {
        type: String,
        required: [true, 'Provide resume link or file path'],
    },
    coverLetter: {
        type: String,
        maxlength: [1000, 'Cover letter must not exceed 1000 characters'],
        default: '',
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Accepted'],
            message: `${Value}  is not valid status`,
        },
        default: 'Pending',
    },


},
    {
        timestamps: true,
    });

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application