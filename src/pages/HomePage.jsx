import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const HomePage = () => {
	const { fetchAllProducts, products,loading } = useProductStore();
	const [searchQuery, setSearchQuery] = useState(''); // State for the search query
	const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
	const [sortOption, setSortOption] = useState(''); // State for the selected sorting option

	

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);
	useEffect(() => {
		let filtered = products?.filter((product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.category.toLowerCase().includes(searchQuery.toLowerCase())
		);
		if (sortOption === 'name') {
			filtered = filtered?.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === 'priceAsc') {
			filtered = filtered?.sort((a, b) => a.price - b.price);
		} else if (sortOption === 'priceDesc') {
			filtered = filtered?.sort((a, b) => b.price - a.price);
		}
		setFilteredProducts(filtered);
	}, [searchQuery, products, sortOption]);
	console.log("products:", products);
	return (
		<div className='min-h-screen'>
			<div className=' z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<h1 className='text-4xl font-bold text-emerald-400 mb-8 text-center'>
					Our Products
				</h1>
			<div className='mb-6 flex flex-col gap-4 justify-between '>
					<input
						type='text'
						placeholder='Search by name or category...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
						className='w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
					/>
					<select
						className='ml-auto p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
						value={sortOption}
						onChange={(e) => setSortOption(e.target.value)}
					>
						<option value=''>Sort By</option>
						<option value='name'>Name</option>
						<option value='priceAsc'>Price: Low to High</option>
						<option value='priceDesc'>Price: High to Low</option>
					</select>
				</div>
				{loading&&(
						<div className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<ProductSkeleton/>
						<ProductSkeleton/>
						<ProductSkeleton/>
						<ProductSkeleton/>
						<ProductSkeleton/>
						</div>
					)}
				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					
					{(products?.length === 0 ||products=== undefined) && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No products found
						</h2>
					)}

					{filteredProducts?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};
export default HomePage;
