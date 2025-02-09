import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { useUserStore } from './stores/useUserStore'

import  LoadingSpinner  from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import CreateBookForm from './pages/CreateBookForm'
import SemesterBooksPage from './pages/SemesterBookspage'
import ChatPage from './pages/ChatPage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import OTPVerificationForm from './components/OTPVerificationForm'
import AccountPage from './pages/AccountPage'
import ReportPage from './pages/ReportPage'


function App() {

  const { user, checkAuth, checkingAuth, refreshToken } = useUserStore()
   
  useEffect(()=>{
    checkAuth()
    refreshToken()
  },[checkAuth,refreshToken])



 
  if (checkingAuth) return <LoadingSpinner />

  return (
    <div className='min-h-screen  bg-gray-900 text-white relative overflow-hidden' data-theme={"coffe"}>
    {/* Background gradient */}
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>
    </div> 

    <div className='relative z-50 pt-20'>
      <Navbar/>
      <Routes>
        <Route path='/' element={user?.role === "admin"? <Navigate to="/admin"/> : <HomePage/>}/>
        <Route path='/login' element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!user ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path='/admin' element={user?.role === "admin"?<AdminPage/> : <Navigate to="/"/> } />
        <Route path='/sell' element={user ? <CreateBookForm/> : <Navigate to="/"/>}/>
        <Route path='/:department/' element={<SemesterBooksPage/>}/>
        <Route path='/:department/:semester' element={<SemesterBooksPage/>}/>
        <Route path='/chat' element={user ? <ChatPage/> : ""}/>
        <Route path='/otp' element={<OTPVerificationForm/>}/>
        <Route path='/account' element={<AccountPage/>} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path='/book' element= { <ProductPage />} />
        <Route path='/report' element= { <ReportPage/>} />
      </Routes> 
      
   </div>
   <Toaster/>
   </div>
  )
}

export default App
