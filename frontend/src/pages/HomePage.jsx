import Slider from '../components/Slider'
import Department from '../components/Department';
const departments = [
	{ href: "/bca", name: "BCA", image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
	{ href: "/economics", name: "BA-ECONOMICS", image: "https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
	{ href: "/english", name: "BA-ENGLISH", image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
	{ href: "/bba", name: "BBA", image: "https://images.pexels.com/photos/7947758/pexels-photo-7947758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
	{ href: "/bcom", name: "BCOM", image: "https://images.pexels.com/photos/8297031/pexels-photo-8297031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },

];

const HomePage = () => {

	return (
		<div className="bg-gray-100 min-h-screen text-black">

			<section className="py-8 bg-white">
				<Slider />
			</section>


			<section className="py-8 bg-gray-50" id="departments">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-semibold mb-8">Shop by Department</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4">
						{
							departments.map((department => (
								<Department department={department} />
							)
							))
						}
					</div>



				</div>
			</section>
		</div>
	);
};

export default HomePage