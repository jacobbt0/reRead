import { MessageCircle } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
const loginError = () =>{
	if(!user) 	return toast.error("Login to chat")
}
	return (

		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg cursor-pointer'>
			<Link to={"/pro"}>
				<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
					<img className='object-cover w-full' src={product.bookImage} alt='product image' />
					<div className='absolute inset-0 bg-black bg-opacity-20' />
				</div>

				<div className='mt-4 px-7 pb-5 justify-center'>
					<div className='mt-1 mb-1 flex items-center justify-between'>
						<p>
							<span className='text-xl font-bold text-emerald-400'>₹{product.price}</span>
						</p>
					</div>
					<h5 className='text-xl font-semibold tracking-tight text-white mt-1 mb-1'>{product.title}</h5>
					<h6 className='text-sm font-semibold tracking-tight text-white mt-1 mb-1'>{product.author}</h6>
					<h5 className='text-sm font-semibold tracking-tight text-white mt-1 mb-1'>{product.department}</h5>
					<h5 className='text-sm font-semibold tracking-tight text-white mt-1 mb-1'>{product.semester}</h5>
				
					<Link
						to={ user ? "/chat" : "" 
						}
						onClick={
							loginError
							}
						
						className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 mt-2 '

					>
				
					< MessageCircle size={22} className='mr-2' />
					Chat

					</Link>
					</div>
				
			</Link>
		</div>

	);
};
export default ProductCard
