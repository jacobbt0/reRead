import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Lock, ArrowRight, Loader, Phone } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [phone, setPhone] = useState("+91");
  const [password, setPassword] = useState("");
  const { login, loading, loginWithGoogle } = useUserStore();
  const clientId = "770439825399-vf9io9g7viclfnqquriom5i2o8fvrrt3.apps.googleusercontent.com";

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    const token = response.credential;
    loginWithGoogle(token);
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(phone, password);
  };

  return (
    <div className='flex flex-col justify-center min-h-screen bg-gray-200 px-6 py-12 text-black'>
      <motion.div
        className='mx-auto w-full max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-center text-3xl font-bold text-gray-800'>Login</h2>
      </motion.div>

      <motion.div
        className='mt-8 mx-auto w-full max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-white shadow-md rounded-lg px-8 py-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                Phone Number
              </label>
              <div className='mt-1 relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <Phone className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='phone'
                  type='tel'
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='0000000000'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1 relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' /> Loading...
                </>
              ) : (
                <>
                  <LogIn className='mr-2 h-5 w-5' /> Login
                </>
              )}
            </button>
          </form>

          <div className='mt-5 text-center'>
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} useOneTap />
            </GoogleOAuthProvider>
          </div>

          <p className='mt-6 text-center text-sm text-gray-500'>
            Not a member?{' '}
            <Link to='/signup' className='font-medium text-indigo-600 hover:text-indigo-500'>
              Sign up now <ArrowRight className='inline h-4 w-4' />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
