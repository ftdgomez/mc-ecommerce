import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { ProductsContext } from '../context/ProductsContext';

const ProductItem = ({ product, handleDelete }) => {
	const { productCart, setProductCart } = useContext(ProductsContext);
	const [count, setCount] = useState(() => {
		return product.qty ? product.qty : 1;
	});
	const { product_name, price, pictures } = product;
	const handleProductQtyChange = (qty, product) => {
		setCount(qty);
		const productListUpdated = productCart.map((p) =>
			p.id === product.id ? { ...p, ['qty']: qty } : p
		);
		setProductCart(productListUpdated);
		localStorage.setItem('productCart', JSON.stringify(productListUpdated));
	};
	return (
		<li className='grid grid-cols-4 gap-4 border m-4 bg-white shadow'>
			<div
				className='h-20 w-20 bg-cover bg-center flex items-center jsutify-center relative'>
						<div className="bg-white relative z-10">
							<img src={`https://sass.refrigeracionmc.com${pictures?.split(',')[0]}`} alt="" />
						</div>
					<div className="absolute top-8 left-8 border border-t-4 border-primary rounded-full h-4 w-4 animate-spin"></div>
				</div>

			<div className='col-span-2 grid grid-rows-2'>
				<h4 className='font-bold text-sm capitalize overflow-hidden h-10'>{product_name}</h4>
				<div className='grid grid-cols-3 items-center w-20 text-center'>
					<button
						onClick={() =>
							count > 1 && handleProductQtyChange(count - 1, product)
						}
						className='border rounded px-2 p'>
						-
					</button>
					<input
						className='text-center border border-gray-200 p-0'
						type='text'
						value={count}
						onChange={(e) => handleProductQtyChange(count, product)}
					/>
					<button
						onClick={() => handleProductQtyChange(count + 1, product)}
						className='border rounded px-2 p'>
						+
					</button>
				</div>
			</div>
			<div className='flex flex-col justify-between space-y-2 border-l'>
				<p className='text-right font-bold border-b p-2'>
					${price} {count > 1 && `x ${count}`}
				</p>
				<button
					className='flex item-center h-full justify-end px-2'
					onClick={() => handleDelete(product)}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='text-red-600 h-5 w-5 block'>
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

export const CartSideBar = ({ showCart, handler, embedded }) => {
	const { productCart, removeFromCart, setProductCart } = useContext(ProductsContext);

	useEffect(()=>{
		if (!productCart || productCart.length < 1){
			const products = window.localStorage.getItem('productCart');
			if (products){
				setProductCart(JSON.parse(products));
			}
		}
	},[])

	return (
		<div className={embedded ? undefined : 'flex w-full max-h-screen'}>
			{!embedded && (
				<div onClick={()=>handler(!showCart)} className='h-screen bg-black opacity-70 fixed top-0 left-0 w-full' style={{zIndex: 21}}></div>
			)}
			<div
				className={
					embedded
						? 'border p-4 rounded bg-white'
						: 'h-screen bg-gray-100 w-full flex flex-col md:w-96 md:ml-auto z-30 fixed top-0 right-0'
				}>
				<header
					className={
						embedded
							? 'hidden'
							: 'flex justify-between items-center px-4 border-b p-6 bg-white h-20'
					}>
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
								{productCart.length}
							</span>
						</button>
					</div>
				</header>
				{embedded && <h2>Detalles de su compra:</h2>}
				<div className='row-span-4 overflow-auto'>
					{productCart.length < 1 ? (
						<p className='text-center p-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='mx-auto h-20 w-20'>
								<path d='M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm13.299 8.76c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z' />
							</svg>
							<br />
							No hay productos en su carrito.
						</p>
					) : (
						productCart.map((p) => (
							<ProductItem key={p.id} product={p} handleDelete={removeFromCart} />
						))
					)}
				</div>
				<div className='mt-auto bg-white'>
					{/* 					<div className='flex justify-between items-center border-t p-4'>
						<p className='font-bold'>Subtotal:</p>
						<p className='font-bold'>100.00$</p>
					</div>
					<div className='flex justify-between items-center border-t p-4'>
						<p>Descuento:</p>
						<p>Cupón: 5%</p>
					</div>
 */}
					{productCart.length > 0 && (
						<div>
							<div className='flex justify-between items-center border py-2 px-4 m-4'>
								<p className='font-bold'>Total:</p>
								<p className='font-bold border-l pl-4'>
									$
									{productCart.reduce(
										(total, product) =>
											total + Number(product.price) * Number(product.qty),
										0
									)}
								</p>
							</div>
							{!embedded && (
								<div className='mx-4'>
									<Link href='/checkout'>
										<a className='bg-secondary px-8 py-4 text-white font-bold mt-auto mb-4 text-md text-center w-full block'>
											Terminar Compra
										</a>
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
