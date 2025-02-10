import { Link } from "react-router-dom";

const Department = ({ department }) => {

	return (

		
			<Link to={department.href} >
				<div className="p-6 bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
					<img src={department.image} alt={department.name} className="w-52 h-44 object-cover rounded-md mb-4" />
					<h3 className="text-xl font-semibold mb-2">{department.name}</h3>

				</div>
			</Link>
	

	);
};

export default Department;