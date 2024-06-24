import JobApplication from "../models/applyJob.js";
import {sendEmail} from "../email-service/email.js";
import NotificationModal from "../models/notificationModal.js";


export const createJobApplication = async (req, res) => {
    try {
        const { firstName,lastName,age,degree,experience,cv,location,job,email,userId,lecture,
            lectureNote} = req.body;

        if (!firstName || !lastName || !age || !degree || !experience || !cv || !location || !job || !userId) {
            return res.status(400).json({ message: "Please Provide All Required Fields" });
        }

        const jobApplication = new JobApplication({
            firstName,lastName,age,degree,experience,cv,location,job,email,userId,lecture,lectureNote
        });

        await jobApplication.save();

        res.status(200).json({
            success: true,
            message: "Job Application Submitted Successfully",
            jobApplication,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getJobApplication = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find();

        res.status(200).json({
            success: true,
            jobApplications,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const editJobApplicationStatus = async (req, res) => {
    const { id,status } = req.params; // Get job application ID from request parameters

    try {
        const jobApplication = await JobApplication.findById(id);

        const generateEmailTemplate = (name,status) => {
            return `
            <h1>Dear ${name}</h1>
            <p>Your job application status is ${status}</p>
            `
        }

        console.log(jobApplication)

        if (!jobApplication) {
            return res.status(404).json({ success: false, message: "Job application not found" });
        }

        jobApplication.status = status || jobApplication.status;
        await jobApplication.save();

        // sendEmail(jobApplication.email,jobApplication.status,generateEmailTemplate(jobApplication.firstName,jobApplication.status))
        // Respond with the updated job application
        res.status(200).json({
            success: true,
            jobApplication,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const editJobApplication = async (req, res) => {
    const { lectureNote } = req.body; // Get job application ID from request parameters
    const { id } = req.params; // Get job application ID from request parameters

    console.log(req.body.lectureNote)
    try {
        const jobApplication = await JobApplication.findById(id);

        const generateEmailTemplate = (name,status) => {
            return `
            <h1>Dear ${name}</h1>
            <p>Your job application status is ${status}</p>
            `
        }


        if (!jobApplication) {
            return res.status(404).json({ success: false, message: "Job application not found" });
        }



        jobApplication.lectureNote = req.body.lectureNote || jobApplication.lectureNote;
        await jobApplication.save().then((job)=>{
            let note = {
                notificationTitle:"notificationTitle",
                notificationMessage:"Job was updated By lectureNote",
                userId:job.userId

            }

            let noteCom = {
                notificationTitle:"notificationTitle",
                notificationMessage:"Job was updated By lectureNote",
                jobId:id

            }

            notificationCreate(note,res)
            notificationCreateCom(noteCom,res)
        })

        // sendEmail(jobApplication.email,jobApplication.status,generateEmailTemplate(jobApplication.firstName,jobApplication.status))
        // Respond with the updated job application
        res.status(200).json({
            success: true,
            jobApplication,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const notificationCreate = async ({notificationTitle, notificationMessage, userId}, res) => {

    console.log("sdf")
    const notification = new NotificationModal({
        notificationTitle:notificationTitle,
        notificationMessage:notificationMessage,
        userId:userId
    })

    await notification.save();
}
export const notificationCreateCom = async ({notificationTitle, notificationMessage, jobId}, res) => {

    console.log("sdf")
    const notification = new NotificationModal({
        notificationTitle:notificationTitle,
        notificationMessage:notificationMessage,
        jobId:jobId
    })

    await notification.save();
}

