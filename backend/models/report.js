import mongoose from "mongoose"

const reportSchema = new mongoose.Schema(
    {
        reportedUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reportSenderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reportReason: {
            type: String,
            required: true,
            
        },
        reportDescription: {
            type: String,
        }
    }, {
    timestamps: true
}
)

const Report = mongoose.model('Report', reportSchema)

export default Report