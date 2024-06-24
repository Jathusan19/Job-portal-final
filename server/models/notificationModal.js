import mongoose from 'mongoose';

// Define the schema
const notificationSchema = new mongoose.Schema({
   notificationTitle: {
        type: String,
        required: true
    },
    notificationMessage: {
        type: String,
        required: true
    },
    userId: {
        type: [String],
    },
    jobId: {
        type: String,
    }

}, { timestamps: true });

const NotificationModal = mongoose.model('notification', notificationSchema);

export default NotificationModal;
