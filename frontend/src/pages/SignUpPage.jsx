import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserPlus, Phone, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import OTPVerificationForm from "../components/OTPVerificationForm";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+91",
    password: "",
    confirmPassword: "",
  });

  const [otpSend, setOtpSend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const { signup, loading, loginWithGoogle } = useUserStore();
  const clientId = "770439825399-vf9io9g7viclfnqquriom5i2o8fvrrt3.apps.googleusercontent.com";

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    const token = response.credential;
    loginWithGoogle(token); 
  }; 

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };
  const verifyOTP = async (otp) => {
    console.log(otp,"otp")
		const phone = formData.phone
		try {
			const response = await axiosInstance.post("http://localhost:8888/api/auth/verify-otp", { phone, otp })
			console.log(response)
			setOtpVerified(true)
			signup(formData)
		} catch (error) {
			toast.error(error.response.data || "An error occurred")

		}
	}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    try {
      await axiosInstance.post("http://localhost:8888/api/auth/send-otp", { phone: formData.phone });
      setOtpSend(true);
      toast.success("OTP Sent");
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
    }
  };
  if (otpSend) {
    return (
       <OTPVerificationForm sendData={verifyOTP} />
    )
  }

  return (
    <>
      
       { !otpSend ? (
          <div className='flex flex-col justify-center min-h-screen bg-gray-50 px-6 py-12 text-black'>
            <motion.div
              className='mx-auto w-full max-w-md'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-center text-3xl font-bold text-gray-800'>Create Your Account</h2>
            </motion.div>

            <motion.div
              className='mt-8 mx-auto w-full max-w-md'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className='bg-white shadow-md rounded-lg px-8 py-6 '>
                <form onSubmit={handleSubmit} className='space-y-6 '>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Full Name</label>
                    <input
                      id='name'
                      type='text'
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='John Doe'
                    />
                  </div>
                  <div>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone Number</label>
                    <input
                      id='phone'
                      type='tel'
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='0000000000'
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                      id='password'
                      type='password'
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='••••••••'
                    />
                  </div>
                  <div>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input
                      id='confirmPassword'
                      type='password'
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='••••••••'
                    />
                  </div>
                  <div className='mt-5 text-center'>
                    <GoogleOAuthProvider clientId={clientId}>
                      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} useOneTap />
                    </GoogleOAuthProvider>
                  </div>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
                    disabled={loading}
                  >
                    {loading ? <><Loader className='mr-2 h-5 w-5 animate-spin' /> Loading...</> : <><UserPlus className='mr-2 h-5 w-5' /> Sign Up</>}
                  </button>
                </form>
                <p className='mt-6 text-center text-sm text-gray-500'>
                  Already have an account?{' '}
                  <Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>Login here <ArrowRight className='inline h-4 w-4' /></Link>
                </p>
              </div>
            </motion.div>
          </div>
        )
        : !otpVerified ? (
					<div>
						<OTPVerificationForm sendData={verifyOTP} />
					</div>
				) : (
					<Navigate to={'/'} />
				)

      }
    </>

  );
};

export default SignUpPage;
