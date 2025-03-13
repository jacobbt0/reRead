import { MessageCircle } from "lucide-react";
import Button from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Link } from "react-router-dom";


const departments = [
    { href: "/bca", name: "BCA", image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { href: "/economics", name: "BA-ECONOMICS", image: "https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { href: "/english", name: "BA-ENGLISH", image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { href: "/bba", name: "BBA", image: "https://images.pexels.com/photos/7947758/pexels-photo-7947758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { href: "/bcom", name: "BCOM", image: "https://images.pexels.com/photos/8297031/pexels-photo-8297031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },

];



const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            {/* Hero Section */}
            <header className="relative bg-blue-700 text-white py-20 text-center">
                <h1 className="text-4xl font-bold">RE-READ MARKETPLACE</h1>
                <p className="mt-2 text-lg">Buy & sell used books easily, categorized by department & semester.</p>


            </header>

            {/* Department Categories */}
            <section className="max-w-6xl mx-auto py-12">
                <h2 className="text-2xl font-bold text-center mb-6">Browse by Department</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {departments.map((dept, index) => (
                        <Link to={dept.href}  >
                            <Card key={index} className="overflow-hidden bg-blue-100 shadow-lg">
                                <img src={dept.image} alt={dept.name} className="h-40 w-full object-cover" />
                                <CardContent>
                                    <h3 className="text-lg font-semibold">{dept.name}</h3>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>



        </div>
    );
};

export default HomePage
