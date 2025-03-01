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


        const { title, price, department, semester, bookImage, author, sellerId } = req.body
        let cloudinaryResponse = null

        if (bookImage) {
           
            cloudinaryResponse = await cloudinary?.uploader?.upload(bookImage, { folder: "books" })
           
          
        }

        const book = await Product.create({
            title,
            price,
            bookImage: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            author,
            department,
            semester,
            sellerId,


        })
        res.status(201).json(book)

    } catch (error) {
        console.log("Error in createBook controller", error.message)
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

export const getAccount = async (req, res) => {
    const { id } = req.params

    try {
        const book = await Product.find({ sellerId: id })
        res.json(book)
    } catch (error) {
        console.log("Error in getAccount controller", error.message)
        res.status(500).json({ message: "Server error" })
    }
}

export const getBooksBySemester = async (req, res) => {
    const { department, semester } = req.params


    try {
        const books = await Product.find({ department: new RegExp(department, 'i'), semester })

        res.json(books)
    } catch (error) {
        console.log("Error in getBookBySemester controller", error.message)
        res.status(500).json({ message: "Server error" })
    }

}

export const updateBook = async(req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators on update
        });

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
}

