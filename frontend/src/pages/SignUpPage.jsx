import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserPlus, Phone, Lock, User, ArrowRight, Loader, } from "lucide-react"
import { motion } from "framer-motion"
import { useUserStore } from "../stores/useUserStore"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import OTPVerificationForm from "../components/OTPVerificationForm"
import axios from "axios"
import { toast } from "react-hot-toast"


const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		phone: "+91",
		password: "",
		confirmPassword: "",

	});

	
	const [otpSend, setOtpSend] = useState(false);
	const [otpVerified, setOtpVerified] = useState(false)
	const { signup, loading, loginWithGoogle } = useUserStore()
	const clientId = "770439825399-vf9io9g7viclfnqquriom5i2o8fvrrt3.apps.googleusercontent.com"


	const handleSubmit = async (e) => {
		const phone = formData.phone
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			return toast.error("Passwords do not match")
			
		}
		if(formData.password.length < 6){
			return toast.error("Password must be at least 6 characters long")
		}
		try {
			const response = await axios.post("http://localhost:8888/api/auth/send-otp",{phone})
			setOtpSend(true)
			return toast.success("OTP Send")
		} catch (error) {
			toast.error( error.response.data ||"An error occurred")
		}
		}

	const verifyOTP = async (otp) =>{
		const phone = formData.phone
		try {
			const response = await axios.post("http://localhost:8888/api/auth/verify-otp",{phone,otp})
			console.log(response)
			setOtpVerified(true)
			signup(formData)
		} catch (error) {
			toast.error( error.response.data ||"An error occurred")
			
		}
	}


//Login with Google
	const handleLoginSuccess = (response) => {
		console.log('Login Success:', response);

		const token = response.credential
		loginWithGoogle(token)

	}

	const handleLoginFailure = (error) => {
		console.log('Login Failed:', error);
	}
	
	

	return (
		<>
		{
			!otpSend ? (
				<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
					<motion.div
						className='sm:mx-auto sm:w-full sm:max-w-md'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account</h2>
					</motion.div>
	
					<motion.div
						className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
										Full name
									</label>
									<div className='mt-1 relative rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<User className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											id='name'
											type='text'
											required
											value={formData.name}
											onChange={(e) => setFormData({ ...formData, name: e.target.value })}
											className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
										 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
											placeholder='John Doe'
										/>
									</div>
								</div>
	
								<div>
									<label htmlFor='phone' className='block text-sm font-medium text-gray-300'>
										Phone Number
									</label>
									<div className='mt-1 relative rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<Phone className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											id='phone'
											type='tel'
											required
											value={formData.phone}
											onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
											className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
										rounded-md shadow-sm
										 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
										 focus:border-emerald-500 sm:text-sm'
											placeholder='0000000000'
										/>
									</div>
								</div>
	
								<div>
									<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
										Password
									</label>
									<div className='mt-1 relative rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											id='password'
											type='password'
											required
											value={formData.password}
											onChange={(e) => setFormData({ ...formData, password: e.target.value })}
											className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
										rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
											placeholder='••••••••'
										/>
									</div>
								</div>
	
								<div>
									<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
										Confirm Password
									</label>
									<div className='mt-1 relative rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											id='confirmPassword'
											type='password'
											required
											value={formData.confirmPassword}
											onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
											className=' block w-full px-3 py-2 pl-10 bg-gray-700 border
										 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
											placeholder='••••••••'
										/>
									</div>
								</div>
	
	
								<button
									to={'/otp'}
									type='submit'
									className='w-full flex justify-center py-2 px-4 border border-transparent 
								rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
								 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
								  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
									disabled={loading}
								>
	
	
	
	
	
									{loading ? (
										<>
											<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
											Loading...
										</>
									) : (
										<>
											<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
											Sign up
										</>
									)}
								</button>
	
							</form>
	
							<div className="mt-5">
								<GoogleOAuthProvider clientId={clientId}>
	
									<GoogleLogin
										onSuccess={handleLoginSuccess}
										onError={handleLoginFailure}
										useOneTap
									/>
	
								</GoogleOAuthProvider>
							</div>
	
							<p className='mt-8 text-center text-sm text-gray-400'>
								Already have an account?{" "}
								<Link to='/login' className='font-medium text-emerald-400 hover:text-emerald-300'>
									Login here <ArrowRight className='inline h-4 w-4' />
								</Link>
							</p>
						</div>
					</motion.div>
				</div>
				) : !otpVerified ? (
					<div>
				<OTPVerificationForm sendData={verifyOTP}/>
				</div>
				) :(
					<Navigate to={'/'} />
				)
				
		}
			 
		</>

	);
};
export default SignUpPage