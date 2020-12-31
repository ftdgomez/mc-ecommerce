import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { MainLayout } from '../layout/MainLayout';
import Link from 'next/link';
import { ProductCard } from '../components/ProductCard';

const productos = () => {
	const { productList } = useContext(ProductsContext);

	return (
		<MainLayout>
			<header>
				<div className='lg:text-center bg-white py-8'>
					<h1 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl'>
						<span className='font-gray-700'>Nuestros</span>{' '}
						<span className='text-primary'>Productos</span>
					</h1>
					<p className='mt-4 max-w-2xl text-md text-gray-500 lg:mx-auto'>
						En Refrigeración MC tenemos todo lo que necesitas en un solo lugar
					</p>
				</div>
			</header>
			<article className='container md:grid grid-cols-3 gap-4'>
				{productList.slice(0, 3).map((item) => (
					<ProductCard
						badge='Destacado'
						title={item.name}
						pic={item.pic}
						price={item.price}
					/>
				))}
			</article>
			<aside className='container'>
				<form className=' w-full mx-auto h-full flex rounded-lg px-2'>
					<input
						type='text'
						placeholder='¿Buscas algo en específico?'
						className='border border-gray-200 rounded-l w-full bg-white'
					/>
					<button className='border rounded-r bg-white border-l w-12 flex justify-center items-center text-gray-600 hover:bg-gray-200 hover:text-primary'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='currentColor'
							viewBox='0 0 24 24'
							className='h-5'>
							<path d='M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z' />
						</svg>
					</button>
				</form>
			</aside>

			<main className='container md:grid grid-cols-12 gap-4'>
				<div className='col-span-3 bg-white p-4 border rounded'>
					<h2 className='font-bold text-lg pb-2 border-b'>Categorías</h2>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Todos los productos
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Gases refrigerantes
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Repuestos de refrigeración
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Productos y herramientas para refrigeración
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Productos para electrodomésticos
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Respuestos para electricidad
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Misceláneos
						</a>
					</Link>

					<h2 className='font-bold text-md pb-2 border-b'>Sucursales</h2>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							La Casanova
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							La Candelaria
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							Av. Fuerzas Armadas
						</a>
					</Link>
					<Link href='/'>
						<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
							El Cementerio
						</a>
					</Link>
				</div>
				<div className='col-span-9 md:grid grid-cols-3 gap-4'>
					{productList.map((item) => (
						<ProductCard title={item.name} pic={item.pic} price={item.price} />
					))}
				</div>
			</main>
			<footer className='md:flex justify-between items-center bg-white container border rounded'>
				<p>Mostrando 1 de 12 páginas</p>
				<div>
					<nav
						className='relative z-0 inline-flex shadow-sm -space-x-px'
						ariaLabel='Pagination'>
						<a
							href='#'
							className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
							<span className='sr-only'>Previous</span>
							<svg
								className='h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								ariaHidden='true'>
								<path
									fill-rule='evenodd'
									d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
									clip-rule='evenodd'
								/>
							</svg>
						</a>

						<span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
							...
						</span>
						<a
							href='#'
							className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
							<span className='sr-only'>Next</span>
							<svg
								className='h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								ariaHidden='true'>
								<path
									fill-rule='evenodd'
									d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
									clip-rule='evenodd'
								/>
							</svg>
						</a>
					</nav>
				</div>
			</footer>
		</MainLayout>
	);
};

export default productos;
