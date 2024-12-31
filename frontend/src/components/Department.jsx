import { Link } from "react-router-dom";

const Department = ({ department }) => {
	return (
		<div className='relative overflow-hidden h-20 w-full rounded-lg group'>
			<Link to={ department.href }>
				<div className='w-full h-full cursor-pointer'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 opacity-100 z-10' />
                    <h2 className="text-center text-5xl sm:text-6xl font-bold mb-8">
                    {department.name}
                    </h2>
				</div>
			</Link>
		</div>
	);
};

export default Department;