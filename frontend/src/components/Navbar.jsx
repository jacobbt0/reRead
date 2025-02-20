import { User, UserPlus, LogIn, LogOut, Lock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";

    const loginError = () => {
        if (!user) return toast.error("Login to Sell");
    };

    return (
        <header className='fixed top-0 left-0 w-full bg-sky-200 bg-opacity-95 backdrop-blur-md shadow-sm z-40 border-b border-gray-200'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>

                    {/* Logo */}
                    <Link to='/' className='text-2xl font-bold text-gray-800 flex items-center space-x-2'>
                        ReRead Marketplace
                    </Link>

                    {/* Search Bar */}
                    <div className="flex">
                        <input 
                            type="search" 
                            placeholder="Search for books..." 
                            className="w-80 px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button type='button' className="relative right-2 rounded-md flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className='flex flex-wrap items-center gap-4'>
                        {!isAdmin && (
                            <div className="inline-flex gap-5">
                                <Link 
                                    to={"/sell"} 
                                    onClick={loginError} 
                                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center transition duration-300'
                                >
                                    <Plus className='mr-2' size={22} />
                                    Sell
                                </Link>
                                <Link 
                                    to={"/"} 
                                    className='bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-md flex items-center transition duration-300'
                                >
                                    Home
                                </Link>
                            </div>
                        )}

                        {/* User Account */}
                        {user && (
                            <Link to={"/account"} className='text-gray-700 hover:text-blue-500 transition duration-300'>
                                <User className='inline-block mr-1' size={25} />
                                <span className='hidden sm:inline'>Account</span>
                            </Link>
                        )}

                        {/* Admin Dashboard */}
                        {isAdmin && (
                            <Link 
                                to={"/secret-dashboard"} 
                                className='bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md flex items-center transition duration-300'
                            >
                                <Lock className='inline-block mr-1' size={18} />
                                <span className='hidden sm:inline'>Dashboard</span>
                            </Link>
                        )}
  
                        {user ? (
                            <button 
                                className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300'
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline ml-2 '>Log Out</span>
                            </button>
                        ) : (
                            <>
                                <Link 
                                    to={"/signup"} 
                                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center transition duration-300'
                                >
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link 
                                    to={"/login"} 
                                    className='bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-md flex items-center transition duration-300'
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

export default Navbar;