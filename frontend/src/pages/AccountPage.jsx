import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { Trash2, Edit, MessageCircle } from "lucide-react"; // Added MessageCircle for chat
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useChatStore } from "../stores/useChatStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountPage = () => {
    const { fetchAccountData, myProducts, deleteProduct, setUpdatingBook, setBook } = useProductStore();
    const { user } = useUserStore();
    const { users, setSelectedUser } = useChatStore()
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccountData();
    }, [fetchAccountData]);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            fetchAccountData()
        } catch (error) {
            toast.error("Failed to delete book");
        }
    };

    const handleEdit = (productId) => {
        try {

            myProducts.map((book) => {
                if (book._id === productId) {
                    setUpdatingBook(book)
                    navigate("/update")
                }

            })

        } catch (error) {
            console.log(error)
        }
    };

    const handleChat = () => {
        if (!user) {
            toast.error("Please login to start a chat");
            return;
        }
        setSelectedUser(users[0])
        navigate("/chat"); // Navigate to the chat page
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-screen-xl mx-auto px-4 xl:px-6 lg:px-8">
                {/* Page Title */}
                <motion.h1
                    className="text-center text-4xl xl:text-5xl font-bold text-gray-800 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    My Books
                </motion.h1>

                {/* No Books Found Message */}
                {myProducts?.length === 0 && (
                    <h2 className="text-3xl font-semibold text-gray-400 text-center col-span-full">
                        No books found
                    </h2>
                )}

                {/* Books Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >

                    {

                        myProducts?.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Book Image */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={product.bookImage}
                                        alt={product.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* Book Details */}
                                <div className="p-4">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {product.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 mb-1">
                                        <span className="font-medium">Author:</span> {product.author}
                                    </p>
                                    <p className="text-xl text-gray-600 mb-1">
                                        <span className="font-medium">Department:</span> {product.department}
                                    </p>
                                    <p className="text-xl text-gray-600 mb-1">
                                        <span className="font-medium">Semester:</span> {product.semester}
                                    </p>
                                    <p className="text-xl text-gray-600 mb-4">
                                        <span className="font-medium">Price:</span> ₹{product.price}
                                    </p>

                                    {/* Action Buttons (Edit, Delete, Chat) */}
                                    <div className="flex justify-center space-x-7">
                                        {/* Chat Button */}
                                        <Link
                                            onClick={() => { 
                                                setBook(product)
                                                handleChat
                                            }}
                                            className="flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300"
                                            title="Chat"
                                            to={"/chat"}
                                        >
                                            <MessageCircle className="h-6 w-6" /> {/* Larger icon */}
                                        </Link>

                                        {/* Edit Button */}
                                        <button
                                            onClick={() => handleEdit(product._id)}
                                            className="flex items-center justify-center p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                                            title="Edit"
                                        >
                                            <Edit className="h-6 w-6" /> {/* Larger icon */}
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-6 w-6" /> {/* Larger icon */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AccountPage;