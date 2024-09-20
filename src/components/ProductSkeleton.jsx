import React from 'react';

const ProductSkeleton = () => {
	return (
 
			
		<div className='flex w-full relative z-50 pt-20  flex-col overflow-hidden rounded-lg border border-gray-400 shadow-lg'>
			
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-gray-400 animate-pulse'>
			
			</div>

			<div className='mt-4 px-5 pb-5'>
			
				<div className='h-6 bg-gray-400 rounded-md w-3/4 animate-pulse'></div>

				<div className='mt-2 mb-5 flex items-center justify-between'>
			
					<div className='h-8 bg-gray-400 rounded-md w-1/3 animate-pulse'></div>
				</div>

				<div className='h-10 bg-gray-400 rounded-md w-full animate-pulse'></div>
			</div>
		</div>
		
	);
};

export default ProductSkeleton;
