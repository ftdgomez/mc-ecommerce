import { MainLayout } from '../layout/MainLayout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';
import { API_URL, USER_COOKIE } from '../constant';
import { validationMethods, _checkAuthorizationCookie, _fetch } from 'ftdgomez-utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const { isEmail } = validationMethods;

export default function Home({ categories, products: productList, userInfo }) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoPlay: true,
	};
	const [newsletterValue, setNewsletterValue] = useState('')
	const handleNewsletter = async (e) => {
		e.preventDefault();
		if (!isEmail(newsletterValue)) return;
		try {
			const response = await _fetch(API_URL + 'ecommerce/newsletter', 'POST', {email: newsletterValue});
			toast.success('Bien! te has suscrito a nuestro newsletter!')
			setNewsletterValue('')
		} catch (error) {
			console.error(error);
			return
		}
		
	}
	return (
		<div>
			<MainLayout userInfo={userInfo}>
				<div className='hover:cursor-move'>
					<Slider {...settings}>
						<div>
							<img className='w-full' src='/01.jpg' />
						</div>
						{/* <div>
							<img className='w-full' src='/car1.jpg' />
						</div>
						<div>
							<img className='w-full' src='/car3.jpg' />
						</div> */}
					</Slider>
				</div>
				<div className='bg-gray-50'>
					<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
						<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
							<span className='block text-primary'>
								En Refrigeración MC tenemos
							</span>
							<span className='block text-gray-800'>
								todo lo que necesitas en un sólo lugar
							</span>
						</h2>
						<div className='mt-8 lex lg:mt-0 lg:flex-shrink-0'>
							<div className='inline-flex rounded-md shadow'>
								<Link href='/productos'>
									<a className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-primary hover:text-white'>
										Ver Todos Los Productos
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<main className='m-4 max-w-7xl mx-auto md:grid grid-cols-12 gap-4'>
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
					<div className='col-span-9 md:grid grid-cols-3 gap-4 p-4 md:p-0'>
						{productList.slice(0, 9).map((item) => (
							<ProductCard key={item.product_id} product={item} buttons={true} />
						))}
 					</div>
				</main>

				{/* <main className="bg-white max-w-7xl mx-auto">
					<p className="text-center py-16">Por labores de mantenimiento,
					esta sección está dehabilitada temporalmente.</p>
				</main> */}

				<section className='bg-gray-50'>
					<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
						<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
							<span className='block'>Multiples</span>
							<span className='block text-primary'>Métodos de pago</span>
						</h2>
						<div className='mt-8 lex lg:mt-0 lg:flex-shrink-0'>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center'>
								<div className='flex justify-center flex-col items-center text-center'>
									<img className='h-8' src='/zelle.png' />
								</div>
								<div className='flex justify-center flex-col items-center text-center'>
									<img className='h-12' src='/trans.png' />
									<h4 className='text-gray-600'>Transferencia Bancaria</h4>
								</div>
								<div className='flex justify-center flex-col items-center text-center'>
									<img className='h-12' src='/efe.png' />
									<h4 className='text-gray-600'>Efectivo</h4>
								</div>
								<div className='flex justify-center flex-col items-center text-center'>
									<img className='h-6' src='/paypal.png' />
								</div>
								{/* <div className='flex justify-center flex-col items-center text-center'>
									<img className='h-8' src='/tarjeta.png' />
									<h4 className='text-gray-600'>Tarjeta Extranjera</h4>
								</div> */}
							</div>
						</div>
					</div>
				</section>
{/* 
				<section>
					<img src='/car2.jpg' className='w-full' />
				</section> */}

				<section className='bg-secondary py-4'>
					<div>
						<div className='container'>
							<h2 className='text-xl text-left inline-block font-semibold text-white'>
								Unete a nuestro Newsletter
							</h2>
							<p className='text-white text-xs pl-px'>
								Latest news ,articles and updates montly delevered to your
								inbox.
							</p>

							<form onSubmit={handleNewsletter} className='mt-2'>
								<div className='flex items-center'>
									<input
										type='email'
										className='w-full p-2 mr-2  bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none'
										placeholder='suemail@ejemplo.com'
										value={newsletterValue}
										onChange={(e)=>setNewsletterValue(e.target.value)}
										required
									/>
									<button className='block bg-red-600 font-bold text-white w-32 py-2 rounded shadow '>
										Suscribirse
									</button>
								</div>
							</form>

						</div>
					</div>
				</section>

				{/* <section className='md:grid grid-cols-3 gap-4 container' id='blog'>
					<div className='bg-white border rounded'>
						<div
							style={{ backgroundImage: 'url(/placeholder.jpg)' }}
							className='bg-center bg-cover h-52'></div>
						<div className='p-4'>
							<h3 className='font-bold text-md text-gray-700'>
								Título de post de blog
							</h3>
							<p className='text-sm'>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Praesentium, magnam nemo repellat perferendis totam repudiandae.
								Enim eligendi minus officiis voluptas!...
							</p>
							<Button className='mt-4 block' href='/singlepost'>
								Ver Más
							</Button>
						</div>
					</div>
					<div className='bg-white border rounded'>
						<div
							style={{ backgroundImage: 'url(/placeholder.jpg)' }}
							className='bg-center bg-cover h-52'></div>
						<div className='p-4'>
							<h3 className='font-bold text-md text-gray-700'>
								Título de post de blog
							</h3>
							<p className='text-sm'>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Praesentium, magnam nemo repellat perferendis totam repudiandae.
								Enim eligendi minus officiis voluptas!...
							</p>
							<Button className='mt-4 block' href='/singlepost'>
								Ver Más
							</Button>
						</div>
					</div>
					<div className='bg-white border rounded'>
						<div
							style={{ backgroundImage: 'url(/placeholder.jpg)' }}
							className='bg-center bg-cover h-52'></div>
						<div className='p-4'>
							<h3 className='font-bold text-md text-gray-700'>
								Título de post de blog
							</h3>
							<p className='text-sm'>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Praesentium, magnam nemo repellat perferendis totam repudiandae.
								Enim eligendi minus officiis voluptas!...
							</p>
							<Button className='mt-4 block' href='/singlepost'>
								Ver Más
							</Button>
						</div>
					</div>
				</section> */}

				<section className='container'>
					<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-8'>
						<span className='block text-primary'>
							Líderes en comercialización de repuestos
						</span>
						<span className='block text-gray-800'>
							para refrigeración y electrodomésticos
						</span>
					</h2>
				</section>
				<section id='blog'></section>
			</MainLayout>
		</div>
	);
}

export async function getServerSideProps(context) {
	try {
		const {data} = await axios.get(API_URL + 'ecommerce')
		const userInfo = context.req.cookies[USER_COOKIE] || false;
		console.log(!userInfo ? 'user is not logged in' : 'user is logged in');
	return {
		props: {
			categories:data.categories,
			products: data.products,
			userInfo: userInfo
		}
	}
	} catch (error) {
		console.log(error)	
		return {
			props: {
				categories: [],
				products: []
			}
		}
	}
}

