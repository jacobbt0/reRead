import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from './stores/useUserStore'
import  LoadingSpinner  from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import CreateBookForm from './pages/CreateBookForm'
import SemesterBooksPage from './pages/SemesterBookspage'
import ChatPage from './pages/ChatPage'
import ProductPage from './pages/ProductPage'
import OTPVerificationForm from './components/OTPVerificationForm'

function App() {

  const { user, checkAuth, checkingAuth } = useUserStore()

 

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if (checkingAuth) return <LoadingSpinner />

  return (
    <div className='min-h-screen  bg-gray-900 text-white relative overflow-hidden'>
    {/* Background gradient */}
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>
    </div>

    <div className='relative z-50 pt-20'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!user ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/sell' element={user ? <CreateBookForm/> : <Navigate to="/"/>}/>
        <Route path='/:department/' element={<SemesterBooksPage/>}/>
        <Route path='/:department/:semester' element={<SemesterBooksPage/>}/>
        <Route path='/chat' element={ <ChatPage/> }/>
        <Route path='/pro' element={<ProductPage />}/>
        <Route path='/otp' element={<OTPVerificationForm/>}/>
  

      </Routes>

   </div>
   <Toaster/>
   </div>
  )
}

export default App
