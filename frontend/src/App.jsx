import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { useUserStore } from './stores/useUserStore'

import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import CreateBookForm from './pages/CreateBookForm'
import SemesterBooksPage from './pages/SemesterBookspage'
import ChatPage from './pages/ChatPage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import OTPVerificationForm from './components/OTPVerificationForm'
import AccountPage from './pages/AccountPage'
import ReportPage from './pages/ReportPage'
import Test from './pages/Test'
import UpdateBookForm from './pages/UpdateBookForm'


function App() {

  const { user, checkAuth, checkingAuth, refreshToken } = useUserStore()

  useEffect(() => {
    checkAuth()
    refreshToken()
  }, [checkAuth, refreshToken])




  if (checkingAuth) return <LoadingSpinner />

  return (
    <div className='min-h-screen  bg-gray-900 text-white relative overflow-hidden' >
   

      <div className='relative z-50 pt-6 bg-gray-50'>
        <Navbar />
        <Routes>
          <Route path='/test' element={<Test />} />
          <Route path='/' element={user?.role === "admin" ? <Navigate to="/admin" /> : <HomePage />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path='/admin' element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
          <Route path='/sell' element={user ? <CreateBookForm /> : <Navigate to="/" />} />
          <Route path='/:department/' element={<SemesterBooksPage />} />
          <Route path='/:department/:semester' element={<SemesterBooksPage />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to="/" />} />
          <Route path='/otp' element={<OTPVerificationForm />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path='/book' element={<ProductPage />} />
          <Route path='/report' element={<ReportPage />} />
          <Route path='/update' element={ <UpdateBookForm/> } />
        </Routes>

      </div>
      <Toaster />
    </div>
  )
}

export default App
