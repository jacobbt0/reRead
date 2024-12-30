import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader,  } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const departments = ["BCA",]
const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th","8th"]

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		title: "",
		price: "",
		department: "",
		semester: "",
		bookImage: "",
		author:"",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct)
			setNewProduct({ title: "", department: "", price: "", semester: "", bookImage: "", author: "", });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, bookImage: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Sell your Book</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='title' className='block text-sm font-medium text-gray-300'>
						Book Name
					</label>
					<input
						type='text'
						id='title'
						name='title'
						value={newProduct.title}
						onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='author' className='block text-sm font-medium text-gray-300'>
						Author
					</label>
					<input
						type='text'
						id='author'
						name='author'
						value={newProduct.author}
						onChange={(e) => setNewProduct({ ...newProduct, author: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-300'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
						 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='department' className='block text-sm font-medium text-gray-300'>
						Department
					</label>
					<select
						id='department'
						name='department'
						value={newProduct.department}
						onChange={(e) => setNewProduct({ ...newProduct, department: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
						required
					>
						<option value=''>Select a Department</option>
						{departments.map((department) => (
							<option key={department} value={department}>
								{department}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor='semester' className='block text-sm font-medium text-gray-300'>
						Semester
					</label>
					<select
						id='semester'
						name='semester'
						value={newProduct.semester}
						onChange={(e) => setNewProduct({ ...newProduct, semester: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
						required
					>
						<option value=''>Select a Semester</option>
						{semesters.map((semester) => (
							<option key={semester} value={semester}>
								{semester}
							</option>
						))}
					</select>
				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Sell Book
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm