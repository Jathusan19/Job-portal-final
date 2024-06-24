import mongoose from 'mongoose';
0
// Define the schema
const saveJobsSchema = new mongoose.Schema({
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

const SaveJobs = mongoose.model('savejobs', saveJobsSchema);

export default SaveJobs;
