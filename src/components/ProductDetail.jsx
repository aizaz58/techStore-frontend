import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import toast from "react-hot-toast";
const ProductDetail = () => {
  const { productId } = useParams();
  const { fetchProduct, product } = useProductStore();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate=useNavigate()
  useEffect(() => {
    fetchProduct(productId);
  }, [product, productId]);

  if (!product) {
    return <div className='text-white text-center'>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
        toast.error("Please login to add products to cart", { id: "login" });
        return;
    } else {
        
        addToCart(product);
    }
  };
  const handleBackToList = () => {
    navigate(-1); 
  };
  return (
    <motion.div
    className='min-h-screen flex flex-col items-center justify-center py-12 relative'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
     <button
        onClick={handleBackToList}
        className='absolute top-6 left-6 px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 
        rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
      >
         &larr; Back to List
      </button>
     <h1 className='text-2xl lg:text-3xl font-bold text-emerald-400 mb-8 text-center'>
					 Product Detail
				</h1>
    <div className='max-w-5xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
   
      <div className='flex flex-col md:flex-row'>

        <div className='w-full md:w-1/2 h-96'>
          <img
            className='object-cover w-full h-full'
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className='w-full md:w-1/2 p-6 flex flex-col justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-emerald-300'>
              {product.name}
            </h2>
            <p className='text-gray-300 mt-4'>{product.description}</p>
          </div>

          <div className='mt-6'>
            <p className='text-emerald-400 text-3xl'>
              ${product.price}
            </p>
            <button
              onClick={handleAddToCart}
              className='mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export default ProductDetail;
