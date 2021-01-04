import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { CartSideBar } from '../components/CartSideBar';
import Head from 'next/head';
import { ProductsContext } from '../context/ProductsContext';

export const MainLayout = ({ children }) => {
	const [showNavBar, setShowNavBar] = useState(false);
	const { productCart, setProductCart, showCart, setShowCart } = useContext(
		ProductsContext
	);
	const Links = [
		{
			href: '/',
			text: 'Inicio',
		},
		{
			href: '/productos',
			text: 'Productos',
		},
		{
			href: '/sucursales',
			text: 'Sucursales',
		},
		{
			href: '/blog',
			text: 'Blog',
		},
		/* {
			href: '/contacto',
			text: 'Contacto',
		}, */
	];
	useEffect(() => {
		if (localStorage.getItem('productCart')) {
			setProductCart(JSON.parse(localStorage.getItem('productCart')));
		}
		console.log('cart updated');
	}, []);
	return (
		<div
			className={`${showCart && 'overflow-y-hidden'} ${
				showNavBar && 'overflow-y-hidden h-screen'
			}`}>
			<Head>
				<title>Refigeración MC</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				onClick={() => setShowNavBar(!showNavBar)}
				className={`h-screen bg-black opacity-70 fixed top-0 left-0 w-full z-10 ${
					!showNavBar && 'hidden'
				}`}></div>
			<header className='h-20'>
				<nav className='bg-gray-50 border-b w-full fixed top-0 left-0 z-10'>
					<div className='container mx-auto px-6 py-3 md:flex md:justify-between md:items-center'>
						<div className='flex justify-between items-center'>
							<div>
								<Link href='/#'>
									<a className='text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700'>
										<img
											src='/logo.svg'
											alt='Refrigeración Mc'
											className='h-14 w-auto'
										/>
									</a>
								</Link>
							</div>

							<div
								className='flex md:hidden'
								onClick={() => setShowNavBar(!showNavBar)}>
								<button
									type='button'
									className='text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600'
									aria-label='toggle menu'>
									<svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
										<path
											fillRule='evenodd'
											d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'></path>
									</svg>
								</button>
							</div>
						</div>

						<div className='md:flex items-center'>
							<div className={`m-navbar ${showNavBar && 'm-navbar-active'}`}>
								<Link href='/#'>
									<a className='m-logo'>
										<img
											src='/logo.svg'
											alt='Refrigeración Mc'
											className='h-14 w-auto'
										/>
									</a>
								</Link>
								{Links.map((link, index) => (
									<Link key={`${link.text}`} href={link.href}>
										<a className='my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0'>
											{link.text}
										</a>
									</Link>
								))}
							</div>

							<div className='fixed bottom-0 w-full bg-white left-0 p-4 md:relative md:p-0 flex md:justify-center md:block'>
								<button
									className='relative text-gray-700 hover:text-gray-600 flex items-center justify-center'
									onClick={() => setShowCart(!showCart)}>
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
						</div>
					</div>
				</nav>
			</header>
			{showCart && <CartSideBar handler={setShowCart} showCart={showCart} />}
			{/* BODY */}
			<main className='bg-gray-100 pt pb-8'>{children}</main>
			{/* END BODY */}
			<footer className='container-xl md:grid grid-cols-3 bg-white py-8 border-t'>
				<div>
					<p className='text-center md:text-left'>
						Copyright © {new Date().getFullYear()} Refrigeración MC 2603
					</p>
				</div>
				<div className='flex flex-col text-center md:block md:text-center'>
					<p>
						{Links.map((link, index) => (
							<Link key={`${link.text}`} href={link.href}>
								<a className='my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0'>
									{link.text}
								</a>
							</Link>
						))}
						<br />
						<Link href='/politicas-de-privacidad'>
							<a className='my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0'>
								Políticas de privacidad
							</a>
						</Link>
					</p>
				</div>
				<div className='text-center mt-2 md:mt-0 md:text-right flex md:justify-end text-gray-600'>
					<a
						target='_blank'
						href='https://www.instagram.com/refrigeracionmc2603'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							className='h-5 mx-4'
							fill='currentColor'>
							<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
						</svg>
					</a>
					<a href='#' target='_blank'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							className='h-5'
							fill='currentColor'>
							<path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z' />
						</svg>
					</a>
				</div>
			</footer>
		</div>
	);
};
