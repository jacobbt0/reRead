import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Semester from "../components/Semester";

const SemesterBooksPage = () => {
	const { fetchProductsBySemester, products } = useProductStore();

	const { department, semester } = useParams()
	const semesters = [
		{ href: "/1st", name: "1st", },
		{ href: "/2nd", name: "2nd", },
		{ href: "/3rd", name: "3rd", },
		{ href: "/4th", name: "4th", },
		{ href: "/5th", name: "5th", },
		{ href: "/6th", name: "6th", },
		{ href: "/7th", name: "7th", },
		{ href: "/8th", name: "8th", },
	]

	useEffect(() => {
		fetchProductsBySemester(department, semester);
	}, [fetchProductsBySemester, semester, department]);


	return (
		<div className='min-h-screen'>
			
			<Semester semesters={semesters} department={department}/>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{semester ? department.toUpperCase() + " " + semester + " Semester" : ""}
				</motion.h1>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No products found
						</h2>
					)}

					{products?.map((product) => (
						
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};
export default SemesterBooksPage