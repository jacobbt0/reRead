import mongoose from "mongoose"

const reportSchema = new mongoose.Schema(
    {
        reportedUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        
        reason : {
            type: String,
            required: true,
            
        },
        details: {
            type: String,
        }
    }, {
    timestamps: true
}
)

const Report = mongoose.model('Report', reportSchema)

export default Report