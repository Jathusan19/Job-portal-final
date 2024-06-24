import mongoose from 'mongoose';

// Define the schema
const jobApplicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    cv: {
        type: String, // You might store the file path or link here
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending'
    },
    lecture: {
        type: String
    },
    lectureNote: {
        type: String
    },
    userId: {
        type: String,
        default: 'pending'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required: true
    },
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
