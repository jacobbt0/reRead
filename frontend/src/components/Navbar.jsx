import { useState } from "react";
import {
  User,
  UserPlus,
  LogIn,
  LogOut,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const [menuOpen, setMenuOpen] = useState(false);

  const loginError = () => {
    if (!user) return toast.error("Login to Sell");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-sky-200 bg-opacity-95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center"
          >
            ReRead Marketplace
          </Link>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 px-4">
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {!isAdmin && (
              <>
                <Link
                  to="/sell"
                  onClick={loginError}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center"
                >
                  <Plus className="mr-2" size={20} />
                  Sell
                </Link>
                <Link
                  to="/"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-md flex items-center"
                >
                  Home
                </Link>
              </>
            )}

            {user && !isAdmin && (
              <Link
                to="/account"
                className="text-gray-700 hover:text-blue-500 flex items-center"
              >
                <User className="mr-1" size={22} />
                Account
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
              >
                <LogOut size={18} />
                <span className="ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md flex items-center"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-3">
            <SearchBar />
            {!isAdmin && (
              <>
                <Link
                  to="/sell"
                  onClick={() => {
                    loginError();
                    setMenuOpen(false);
                  }}
                  className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  <Plus className="inline mr-2" size={18} />
                  Sell
                </Link>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md"
                >
                  Home
                </Link>
              </>
            )}

            {user && !isAdmin && (
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-500 py-2 px-4"
              >
                <User className="inline mr-2" size={18} />
                Account
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                <LogOut className="inline mr-2" size={18} />
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  <UserPlus className="inline mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md"
                >
                  <LogIn className="inline mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
