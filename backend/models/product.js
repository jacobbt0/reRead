import mongoose, { model } from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        department: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        bookImage: {
            type: String,
            required: true,

        },
        author: {
            type: String,
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }

    }, {
    timestamps: true
}
)

const Product = model('book', bookSchema)

export default Product