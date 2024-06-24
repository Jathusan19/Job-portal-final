import NotificationModal from "../models/notificationModal.js";

export const getNotifications = async (req, res) => {
    try {
        const notification = await NotificationModal.find();

        res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}
