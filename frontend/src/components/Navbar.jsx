import { User, UserPlus, LogIn, LogOut, Lock, Plus, Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import SearchBar from "./SearchBar";
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

                    <SearchBar />

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
                            <div className="flex gap-4 m-3">
                                <Link to={"/account"} className='text-gray-700 hover:text-blue-500 transition duration-300'>
                                    <User className='inline-block mr-1' size={25} />
                                    <span className='hidden sm:inline'>Account</span>
                                </Link>
                                
                            </div>
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