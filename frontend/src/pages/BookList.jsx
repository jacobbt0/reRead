import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import { useChatStore } from "../stores/useChatStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BookList = () => {

    const { user, getUser, seller } = useUserStore();
    const { booksByTitle, setBook } = useProductStore()
    const { users, setSelectedUser } = useChatStore()

    return (
        <div className="container h-screen pt-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Search results
            </h1>

            {booksByTitle.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No books found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {booksByTitle.map((book) => (
                        <div key={book._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={book.bookImage}
                                alt={book.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-900">{book.title}</h2>
                                <p className="text-gray-600 text-sm">by <span className="font-medium text-blue-500">{book.author}</span></p>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{book.description || "No description available."}</p>
                                <p className="text-lg font-semibold text-green-600 mt-2">₹{book.price || "N/A"}</p>
                                <Link to={"/chat"}>
                                    <button
                                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                        onClick={() => {
                                            if (!user) return toast.error("Login to chat")
                                            setBook(book);
                                            getUser(book.sellerId)
                                            setSelectedUser(seller)

                                        }}
                                    >
                                        Chat with Seller
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookList;
