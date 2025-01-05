import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useUserStore()
    const isAdmin = user?.role === "admin"

    const loginError = () =>{
        if(!user) 	return toast.error("Login to Sell")
    }

    return (
        <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>
                    <Link to='/' className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
                        ReRead Marketplace
                    </Link>

                    <div className="flex ">
                        <input type="search" placeholder="Search Something..."
                            className=" w-80 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                        <button type='button' className="relative right-2 rounded-md flex items-center justify-center  bg-emerald-600
							 hover:bg-emerald-700 px-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                                <path
                                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                </path>
                            </svg>
                        </button>
                    </div>


                    <nav className='flex flex-wrap items-center gap-4'>
                        <div>
                            <Link
                                to={"/sell"}
                                onClick={loginError}
                                className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                            >
                                <Plus className='mr-2 ' size={22} />
                              Sell
                            </Link>
                        </div>
                        <Link
                            to={"/"}
                            className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                            rounded-md flex items-center transition duration-300 ease-in-out'
                        >
                            Home
                        </Link>
                        {user && (
                            <Link
                                to={"/cart"}
                                className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 
							ease-in-out'
                            >
                                <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={25} />
                                <span className='hidden sm:inline'>Cart</span>

                                <span
                                    className='absolute -top-2 right-8  bg-emerald-500 text-white rounded-full px-1.5 py-0.2 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
                                >
                                    
                                </span>

                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
                                to={"/secret-dashboard"}
                            >
                                <Lock className='inline-block mr-1' size={18} />
                                <span className='hidden sm:inline'>Dashboard</span>
                            </Link>
                        )}

                        {user ? (
                            <button
                                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline ml-2'>Log Out</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link
                                    to={"/login"}
                                    className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};
export default Navbar