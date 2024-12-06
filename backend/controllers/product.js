import Product from "../models/product.js"
import cloudinary from "../lib/cloudinary.js"

export const getAllBooks = async (req, res) => {
    try {
        const books = await Product.find({})
        res.json({ books })
    } catch (error) {
        console.log("Error in getAllBooks controllers", error.message)
        res.status(500).json({ message: "server error" })
    }
}

export const createBook = async (req, res) => {
    try {

        const { title, price, department, semester, bookImage, author } = req.body
        let cloudinaryResponse = null

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(bookImagemage, {folder: "books"})
        }

        const book = await Product.create({
            title,
            price,
            bookImage : cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            author,
            department,
            semester,


        })
        res.status(201).json(book)

    } catch (error) {
        console.log("Error in createProduct controller", error.message)
		res.status(500).json({ message: "Server error", error: error.message })

    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = await Product.findById(req.params.id)

        if(!book){
            res.status(404).json({ message: "Book not found"})
        }

        if(book.bookImage){
            const publicId = book.bookImage.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`books/${publicId}`)
                console.log('Image deleted from cloudinary')
            } catch (error) {
                console.log(error.message)
            }
        await Product.findByIdAndDelete(req.params.id)
        res.json({message: "book deleted successfully"})
        }
    } catch (error) {
        console.log("error in deleteBook controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const getBooksBySemester = async (req, res) => {
    const {semester, department} = req.params

    try {
        const books = await Product.find({ semester, department})
        res.json(books)
    } catch (error) {
        console.log("Error in getBookBySemester controller", error.message)
        res.status(500).json({message:"Server error"})
    }

} 