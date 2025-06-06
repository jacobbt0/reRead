import Report from "../models/report.js"

export const getAllReports = async (req, res) => {
    try {
        const report = await Report.find({})
        console.log(report)
        res.json(report)
    } catch (error) {
        console.log("Error in getAllReports controllers", error.message)
        res.status(500).json({ message: "server error" })
    }
}

export const sendReport = async (req, res) => {
    try {

        const { reason, details, bookId} = req.body
        const { id: reportedUserId } = req.params

        const newReport = new Report({
            reason,
            reportedUserId,
            details,
            bookId,
            
        })

        await newReport.save()

        res.status(201).json(newReport)

    } catch (error) {
        console.log("Error in sendReport controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}