import React, { Suspense, useState } from 'react'
import './App.css'
import { Navigate, Route, Router, Routes } from "react-router-dom";

const HomePage=React.lazy(() =>import ("./pages/HomePage"))
const SignUpPage=React.lazy(() =>import ("./pages/SignUpPage"))
const LoginPage=React.lazy(() =>import ("./pages/LoginPage"))
const AdminPage=React.lazy(() =>import ("./pages/AdminPage"))
const CartPage=React.lazy(() =>import ("./pages/CartPage"))
const ProfilePage=React.lazy(() =>import ("./pages/ProfilePage"))




import Navbar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

import { useCartStore } from "./store/useCartStore";
import ProductSkeleton from './components/ProductSkeleton';
import ProductDetail from './components/ProductDetail';


function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);
// if(checkingAuth){
// 	return (<div className='container mx-auto px-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// 	Loading
// 	</div>
// 	)
// }
  return (
  
    <div className='min-h-screen bg-gray-800 text-white relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>
 
      <div className='relative z-50 pt-20'>
				<Navbar />
				
<Suspense fallback={<div className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<ProductSkeleton/>
						<ProductSkeleton/>
						<ProductSkeleton/>
						<ProductSkeleton/>
						<ProductSkeleton/>
						</div>}>

				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
						/>
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route path='/product/:productId' element={<ProductDetail />} />
					</Routes>
						</Suspense>
				
			</div>
			<Toaster />
		</div>

  )
}

export default App
