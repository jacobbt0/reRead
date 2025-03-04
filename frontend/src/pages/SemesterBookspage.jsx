import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { Menu } from "lucide-react"

const SemesterBooksPage = () => {
    const { fetchProductsBySemester, products } = useProductStore();
    const { department, semester = "1st" } = useParams(); // Default to "1st" semester
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const semesters = [
        { href: "1st", name: "1st" },
        { href: "2nd", name: "2nd" },
        { href: "3rd", name: "3rd" },
        { href: "4th", name: "4th" },
        { href: "5th", name: "5th" },
        { href: "6th", name: "6th" },
        { href: "7th", name: "7th" },
        { href: "8th", name: "8th" },
    ];

    useEffect(() => {
        fetchProductsBySemester(department, semester);
    }, [fetchProductsBySemester, semester, department]);

    const handleSemesterChange = (semesterHref) => {
        navigate(`/${department}/${semesterHref}`);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className='min-h-screen'>
            <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                {/* Dropdown Menu for Semesters */}
                <div className="relative inline-block text-left mb-8">
                    <div className="pt-2 mt-2">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="inline-flex justify-center items-center w-10 h-10 rounded-md border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <Menu className="h-5 w-5" /> {/* Three-line icon */}
                        </button>
                    </div>

                    {isDropdownOpen && (
                        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1 ">
                                {semesters.map((sem) => (
                                    <button
                                        key={sem.href}
                                        onClick={() => handleSemesterChange(sem.href)}
                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        {sem.name} Semester
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Page Title */}
                <motion.h1
                    className='text-center text-4xl sm:text-5xl font-bold text-blue-600 mb-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {department.toUpperCase()} {semester} Semester
                </motion.h1>

                {/* Product Grid */}
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

export default SemesterBooksPage;