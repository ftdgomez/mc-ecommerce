import { MainLayout } from '../layout/MainLayout';
import Link from 'next/link';
import router from 'next/router';
import { ProductCard } from '../components/ProductCard';
import axios from 'axios';
import { API_URL } from '../constant';
import {useState} from 'react';
import { _checkAuthorizationCookie } from 'ftdgomez-utils';

const productos = ({ categories, products, currentPage, currentCategory, keyword, totalPages, userInfo}) => {

	const [searchKeyword, setSearchKeyword] = useState('')

	const handleSearch = (e) => {
		e.preventDefault()
		router.push('/productos?search=' + searchKeyword)
	}

	return (
		<MainLayout userInfo={userInfo}>
			<header className="p-4 md:p-0 bg-white mb-8">
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
			{
				!keyword &&
		<article className='p-4 md:p-0 max-w-6xl mx-auto md:grid grid-cols-3 gap-4'>
				{products.slice(0, 3).map((item) => (
					<ProductCard badge='Destacado' product={item} key={item.id}/>
				))}
			</article>
			}
	
			{
				currentCategory && <div className="container"><h3 className="text-center text-2xl capitalize p-4 border font-bold bg-white">{categories.filter(c => c.category_id === Number(currentCategory))[0].categoryName}</h3></div>
			}

			<aside className='max-w-6xl m-4 md:m-0 md:mx-auto md:mb-8'>
				<form onSubmit={handleSearch} className='h-full flex rounded-lg'>
					<input
						type='text'
						placeholder='¿Buscas algo en específico?'
						className='border border-gray-200 rounded-l flex-1 bg-white'
						value={searchKeyword}
						onChange={(e)=>setSearchKeyword(e.target.value)}
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
					<main className='mb-4 mx-auto max-w-6xl md:grid grid-cols-12 gap-4'>
					<div className='col-span-3 bg-white p-4 border rounded mb-4 md:mb-0'>
						<h2 className='font-bold text-lg pb-2 border-b'>Categorías</h2>
						<Link href='/productos'>
							<a className='text-gray-500 hover:text-gray-800 my-4 text-sm block'>
								Todos los productos
							</a>
						</Link>
						{
							categories.map(c => (
						<Link href={`/productos?cat=${c.category_id}`} key={`cat-${c.category_id}`}>
							<a className='text-gray-500 capitalize hover:text-gray-800 my-4 text-sm block'>
						{c.categoryName}
							</a>
						</Link>
							))
						}
										</div>
					<div className='col-span-9 md:grid grid-cols-3 gap-4 m-4 md:m-0'>
						{products.slice(keyword ? 0 : 3, keyword ? products.length : 12).map((item) => (
							<ProductCard key={item.id} product={item} />
						))}
						{products.length < 1 && <p className="bg-white border p-4">Oops! parece que no hay productos por aquí.</p>}
					</div>
				</main>

            {
				!keyword &&

			<footer className='md:flex justify-between items-center bg-white container border rounded'>
				<p></p>
				<div>
					<nav
						className='relative z-0 inline-flex shadow-sm -space-x-px'
						aria-label='Pagination'>
						<a
							href={`/productos/?page=${currentPage === 1 ? 1 : currentPage - 1}${currentCategory ? `&cat=${currentCategory}` : '' }`} 
							className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
							<span className='sr-only'>Previous</span>
							<svg
								className='h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'>
								<path
									fillRule='evenodd'
									d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						</a>

						<span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
				{currentPage} de {totalPages}
						</span>
						<a
							href={`/productos/?page=${currentPage >= totalPages ? currentPage : currentPage + 1}${currentCategory ? `&cat=${currentCategory}` : '' }`} 
							className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
							<span className='sr-only'>Next</span>
							<svg
								className='h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'>
								<path
									fillRule='evenodd'
									d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						</a>
					</nav>
				</div>
			</footer>
			}
		</MainLayout>
	);
};

export async function getServerSideProps(context) {
	try {
		const userInfo = _checkAuthorizationCookie(context, '/');
		const query = context.query
		const currentPage = query.page ? Number(query.page) : 1;
		const currentCategory = query.cat || '';
		const keyword = query.search || false;

		const productsURL = `${API_URL}ecommerce/products${currentPage ? '?page=' + currentPage : '?page=1'}${currentCategory ? `&cat=${currentCategory}` : ''}${keyword ? `&search=${keyword}` : ''}`
		const { data } = await axios.get(productsURL)
		return {
			props: {
				...data,
				currentPage,
				currentCategory,
				keyword,
				userInfo
			}
		}
	} catch (error) {
		console.log(error);
		return  {props:{}}
	}
}

export default productos;
