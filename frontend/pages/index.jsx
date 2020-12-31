import { MainLayout } from '../layout/MainLayout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

export default function Home() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoPlay: true,
	};
	const { productList } = useContext(ProductsContext);
	return (
		<div>
			<MainLayout>
				<div className='hover:cursor-move'>
					<Slider {...settings}>
						<div>
							<img className='w-full' src='/car2.jpg' />
						</div>
						<div>
							<img className='w-full' src='/car1.jpg' />
						</div>
						<div>
							<img className='w-full' src='/car3.jpg' />
						</div>
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
							<ProductCard
								title={item.name}
								pic={item.pic}
								price={item.price}
							/>
						))}
					</div>
				</main>

				<section className='bg-gray-50'>
					<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
						<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
							<span className='block'>Multiples</span>
							<span className='block text-primary'>Métodos de pago</span>
						</h2>
						<div className='mt-8 lex lg:mt-0 lg:flex-shrink-0'>
							<div className='grid grid-cols-2 md:grid-cols-5 gap-4 items-center justify-items-center'>
								<div className='flex justify-center flex-col items-center text-center'>
									<img className='h-8' src='/zelle.png' />
									<h4 className='text-gray-600'>Zelle</h4>
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
									<h4 className='text-gray-600'>Paypal</h4>
								</div>
								<div className='flex justify-center flex-col items-center text-center'>
									<img className='h-8' src='/tarjeta.png' />
									<h4 className='text-gray-600'>Tarjeta Extranjera</h4>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<img src='/car2.jpg' className='w-full' />
				</section>
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
							<form action='#' className='mt-2'>
								<div className='flex items-center'>
									<input
										type='email'
										className='w-full p-2 mr-2  bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none'
										placeholder='suemail@ejemplo.com'
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

				<section className='md:grid grid-cols-3 gap-4 container' id='blog'>
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
				</section>

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
