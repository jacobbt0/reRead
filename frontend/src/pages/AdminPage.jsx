import ReportsTable from "../components/ReportsTable";
import { Flag, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useProductStore } from "../stores/useProductStore";
import { useReportStore } from '../stores/useReportStore'
import AdminBookList from "../components/AdminBookList";

const tabs = [
	{ id: "reports", label: "Reports", icon: Flag },
	{ id: "books", label: "Books", icon: Book },

];

const AdminPage = () => {

	const [activeTab, setActiveTab] = useState("reports");
	const { fetchAllProducts, products } = useProductStore();
	const { allReports, loading, getReports } = useReportStore()

	useEffect(() => {
		fetchAllProducts()
		getReports()
	}, [fetchAllProducts, getReports])



	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${activeTab === tab.id
								? "bg-emerald-600 text-white"
								: "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "reports" && <ReportsTable />}
				{activeTab === "books" && <AdminBookList products={products} />}

			</div>
		</div>
	);
};
export default AdminPage;