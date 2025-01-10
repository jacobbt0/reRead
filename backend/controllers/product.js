import Product from "../models/product.js"
import cloudinary from "../lib/cloudinary.js"
import cron from "node-cron"



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
       
       
        const { title, price, department, semester, bookImage, author, sellerId} = req.body
        let cloudinaryResponse = null

        if(bookImage){
            cloudinaryResponse = await cloudinary.uploader.upload(bookImage, {folder: "books"})
        }

        const book = await Product.create({
            title,
            price,
            bookImage : cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            author,
            department,
            semester,
            sellerId,


        })
        res.status(201).json(book)

    } catch (error) {
        console.log("Error in createProduct controller", error.message)
		res.status(500).json({ message: "Server error", error: error.message })

    }
}

export const deleteBook = async (req, res) => {
    try {
		const book = await Product.findById(req.params.id);

		if (!book) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (book.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const getBooksBySemester = async (req, res) => {
    const {department, semester} = req.params
    
  
    try {
        const books = await Product.find({  department: new RegExp(department, 'i'), semester}) 
        
        res.json(books)
    } catch (error) {
        console.log("Error in getBookBySemester controller", error.message)
        res.status(500).json({message:"Server error"})
    }

} 





cron.schedule("0 0 * * *", async () => {  // Runs every day at midnight
    try {
        const result = await Product.deleteMany({
            createdAt: { $lt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
        });

        console.log(`Deleted ${result.deletedCount} products older than 20 days.`);
    } catch (err) {
        console.error("Error deleting products:", err);
    }
})
