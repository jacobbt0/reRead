import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Lock, ArrowRight, Loader, Phone } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'



const LoginPage = () => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("")
	const { login, loading, loginWithGoogle } = useUserStore()
	const clientId = "770439825399-vf9io9g7viclfnqquriom5i2o8fvrrt3.apps.googleusercontent.com"
	

	const handleLoginSuccess = (response) => {
		console.log('Login Success:', response);
		
		const token = response.credential
		loginWithGoogle(token)
		
	}

	const handleLoginFailure = (error) => {
		console.log('Login Failed:', error);
	  }

	const handleSubmit = (e) => {
		e.preventDefault();
		login(phone, password);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Login</h2>
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
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className=' block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
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
									<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
									Login
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
						Not a member?{" "}
						<Link to='/signup' className='font-medium text-emerald-400 hover:text-emerald-300'>
							Sign up now <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div >
			</motion.div >
		</div >
	);
};
export default LoginPage