import React, { useState } from 'react';
import Link from 'next/link';
const ProductItem = () => {
	const [count, setCount] = useState(1);

	return (
		<li className='grid grid-cols-4 gap-4 border m-4 bg-white shadow'>
			<img src='/placeholder.jpg' className='h-20 w-20' alt='' />
			<p className='col-span-2 grid grid-rows-2'>
				<h4 className='font-bold text-sm'>Título de producto en carrito</h4>
				<div className='grid grid-cols-3 items-center w-20 text-center'>
					<button
						onClick={() => count > 1 && setCount(count - 1)}
						className='border rounded px-2 p'>
						-
					</button>
					<input
						className='text-center border border-gray-200 p-0'
						type='text'
						value={count}
						onChange={(e) => setCount(e.target.value)}
					/>
					<button
						onClick={() => setCount(count + 1)}
						className='border rounded px-2 p'>
						+
					</button>
				</div>
			</p>
			<div class='flex flex-col justify-between space-y-2 p-2 border-l'>
				<p>$80.00</p>
				<button class='flex justify-end'>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='text-red-600'>
						<path
							d='M3 6H21'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'></path>
						<path
							d='M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'></path>
						<path
							d='M10 11V17'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'></path>
						<path
							d='M14 11V17'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'></path>
					</svg>
				</button>
			</div>
		</li>
	);
};

export const CartSideBar = ({ showCart, handler }) => {
	return (
		<div className='flex w-full max-h-screen'>
			<div className='h-screen bg-black opacity-70 absolute top-0 left-0 w-full z-10'></div>
			<div className='h-screen bg-gray-100 w-full grid grid-rows-8 md:w-96 md:ml-auto z-20 fixed top-0 right-0'>
				<header className='flex justify-between items-center px-4 border-b p-6 bg-white'>
					<button
						className='text-gray-700 border px-4 py-2 rounded'
						onClick={() => handler(!showCart)}>
						X
					</button>
					<div className='flex md:justify-center md:block'>
						<button
							className='relative text-gray-700 hover:text-gray-600 flex items-center justify-center'
							onClick={() => handler(!showCart)}>
							<svg
								className='h-5 w-5'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<span className='block rounded-full bg-indigo-500 text-white p-1 text-xs'>
								10
							</span>
						</button>
					</div>
				</header>
				<div className='row-span-3 overflow-auto'>
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
				</div>
				<div className='mt-auto bg-white'>
					<div className='flex justify-between items-center border-t p-4'>
						<p className='font-bold'>Subtotal:</p>
						<p className='font-bold'>100.00$</p>
					</div>
					<div className='flex justify-between items-center border-t p-4'>
						<p>Descuento:</p>
						<p>Cupón: 5%</p>
					</div>
					<div className='flex justify-between items-center border-t p-4'>
						<p className='font-bold'>Total:</p>
						<p className='font-bold'>95.00$</p>
					</div>

					<div className='mx-4'>
						<Link href='/register'>
							<a className='bg-secondary px-8 py-4 text-white font-bold mt-auto mb-4 text-md text-center w-full block'>
								Terminar Compra
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
