import React, { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	// State to manage the mobile menu
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Toggle mobile menu
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '';
	console.log(userInitials)
	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className=' mx-auto px-8 py-3'>
				<div className='flex justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-emerald-400'>
						TechStore
					</Link>

		
					<div className='md:hidden'>
						<button onClick={toggleMenu} className='text-gray-300 hover:text-emerald-400 focus:outline-none'>
							{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>

					
					<nav className='hidden md:flex items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 
							ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
							
						)}
						
						{isAdmin && (
							<Link
								className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
						{user && (
							
							<Link to={"/profile"} className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
			 {userInitials}
		   </Link>
				   
				   )}
					</nav>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<nav className={`lg:hidden mt-1 transform transition-transform duration-500 ease-in-out ${
						isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
					} absolute left-0 top-full w-full bg-gray-900 bg-opacity-90 backdrop-blur-md py-4 px-6`}
			>
						<ul className='flex flex-col gap-4'>
							<li>
								<Link
									to={"/"}
									className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
									onClick={toggleMenu}
								>
									Home
								</Link>
							</li>
							{user && (
								<li>
									<Link
										to={"/cart"}
										className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 
									ease-in-out'
										onClick={toggleMenu}
									>
										<ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
										Cart
										{cart.length > 0 && (
											<span
												className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
											text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
											>
												{cart.length}
											</span>
										)}
									</Link>
								</li>
							)}
							{isAdmin && (
								<li>
									<Link
										className='bg-emerald-700 hover:bg-emerald-600 w-fit text-white px-3 py-1 rounded-md font-medium
									transition duration-300 ease-in-out flex items-center'
										to={"/secret-dashboard"}
										onClick={toggleMenu}
									>
										<Lock className='inline-block mr-1' size={18} />
										Dashboard
									</Link>
								</li>
							)}
							{user ? (
								<>
								<li>
									<button
										className='bg-gray-700 w-fit  hover:bg-gray-600 text-white py-1 px-6
									rounded-md flex items-center transition duration-300 ease-in-out'
										onClick={() => {
											logout();
											toggleMenu();
										}}
									>
										<LogOut size={18} />
										Log Out
									</button>
								</li>
								<Link to={"/profile"}  className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
			{userInitials}
			</Link>
										</>
							) : (
								<>
									<li>
										<Link
											to={"/signup"}
											className='bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-4 
										rounded-md flex items-center transition duration-300 ease-in-out'
											onClick={toggleMenu}
										>
											<UserPlus className='mr-2' size={18} />
											Sign Up
										</Link>
									</li>
									<li>
										<Link
											to={"/login"}
											className='bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 
										rounded-md flex items-center transition duration-300 ease-in-out'
											onClick={toggleMenu}
										>
											<LogIn className='mr-2' size={18} />
											Login
										</Link>
									</li>
									{user && (
							
							<li>
			
		   </li>
				   
				   )}
								</>
							)}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Navbar;
