import SaveJobs from "../models/savejobs.js";
import mongoose from "mongoose";

export const createSave = async (req, res) => {
    const { userId, job } = req.body;
    const save = new SaveJobs({
        userId,
        job
    });
    try {
        await save.save();
        res.status(201).json(save);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getSave = async (req, res) => {
    try {
        const save = await SaveJobs.find();
        res.status(200).json(save);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const unSave = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Save with id: ${id}`);

    await SaveJobs.findByIdAndRemove(id);

    res.json({ message: "Save deleted successfully." });
}