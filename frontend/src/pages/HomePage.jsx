import { useEffect } from "react";
import Department  from "../components/Department";


const departments = [
	{ href: "/bca", name: "BCA", },
	
];

const HomePage = () => {


	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-8'>
					Select Your Department
				</h1>
			

				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
					{departments.map((department) => (
						<Department department={department} key={department.name} />
					))}
				</div>

		
			</div>
			
		</div>
	);
};
export default HomePage