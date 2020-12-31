import React, { useContext } from 'react';
import { MainLayout } from '../layout/MainLayout';
import Link from 'next/link';
import { Button } from '../components/Button';
import { ProductsContext } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
const producto = () => {
	const { productList } = useContext(ProductsContext);
	return (
		<MainLayout>
			<div className='min-h-screen bg-white container pt-4'>
				<div>
					<Link href='/productos'>
						<a className='p-4 border rounded bg-white inline-block'>Ir Atrás</a>
					</Link>
				</div>
				<div className='block md:grid grid-cols-2 mt-4'>
					<div className='border'>
						<img className='w-full' src='/placeholder.jpg' />
					</div>
					<div className='p-8 flex flex-col justify-center'>
						<h1 className='font-extrabold text-2xl mb-2 text-gray-700'>
							CAPACITOR DE MARCHA
						</h1>
						<p className='text-sm font-bold border-t border-b py-2 my'>
							16MFD | 20MFD | 22MFD | 24MFD
						</p>
						<h4 className='font-bold text-xl py-2 border-b text-gray-700'>
							$80 - Bsf 123123,123
						</h4>
						<p className='pt-2 mb-4 text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
							pariatur. Sequi et, hic officiis dolore deserunt inventore quas
							cumque odio!
						</p>
						<div>
							<label
								for='price'
								className='block text-sm font-medium text-gray-700'>
								Precio
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<span className='text-gray-500 sm:text-sm'>$</span>
								</div>
								<div className='py-2 border text-gray-600 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'>
									80
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center'>
									<label for='currency' className='sr-only'>
										Variante
									</label>
									<select
										id='Currency'
										name='currency'
										className='focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md'>
										<option>16MFD</option>
										<option>20MFD</option>
										<option>22MFD</option>
									</select>
								</div>
							</div>
						</div>
						<Button className='mt-4'>Agregar A Carrito</Button>
					</div>
				</div>
			</div>

			<article className='container bg-white py-8 mt-4'>
				<h2 className='text-2xl font-extrabold mb-4'>
					Quizá te pueda interesar:
				</h2>
				<div className='md:grid grid-cols-3 gap-4'>
					{productList.slice(0, 3).map((item) => (
						<ProductCard
							badge='Destacado'
							title={item.name}
							pic={item.pic}
							price={item.price}
						/>
					))}
				</div>
			</article>
		</MainLayout>
	);
};

export default producto;
