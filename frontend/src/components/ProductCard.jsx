import { MessageCircle } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useProductStore } from "../stores/useProductStore";
import { useChatStore } from "../stores/useChatStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const { user, getUser, seller } = useUserStore();
    const { setBook } = useProductStore();
    const { setSelectedUser } = useChatStore();
    const loginError = async () => {
        if (!user) return toast.error("Login to chat");
    };

    return (
        <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-200 shadow-lg cursor-pointer bg-white'>
            <Link
                to={"/book"}
                onClick={() => { setBook(product); 
                    getUser(product.sellerId)
                    setSelectedUser(seller)
                 }}
            >
                <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
                    <img className='object-cover w-full' src={product.bookImage} alt='product image' />
                    <div className='absolute inset-0 bg-black bg-opacity-10' />
                </div>

                <div className='mt-4 px-5 pb-5 justify-center'>
                    <div className='mt-1 mb-1 flex items-center justify-between'>
                        <p>
                            <span className='text-xl font-bold text-blue-600'>₹{product.price}</span>
                        </p>
                    </div>
                    <h5 className='text-xl font-semibold tracking-tight text-gray-800 mt-1 mb-1'>{product.title}</h5>
                    <h6 className='text-sm font-semibold tracking-tight text-gray-600 mt-1 mb-1'>{product.author}</h6>
                    <h5 className='text-sm font-semibold tracking-tight text-gray-600 mt-1 mb-1'>{product.department}</h5>
                    <h5 className='text-sm font-semibold tracking-tight text-gray-600 mt-1 mb-1'>{product.semester}</h5>

                    <Link
                        to={"/chat"}
                        onClick={loginError}
                        className='flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2'
                    >
                        <MessageCircle size={22} className='mr-2' />
                        Chat
                    </Link>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;