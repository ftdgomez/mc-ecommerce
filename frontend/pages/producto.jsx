import React, { useContext } from 'react';
import { MainLayout } from '../layout/MainLayout';
import Link from 'next/link';
import { ProductsContext } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { API_URL, USER_COOKIE } from '../constant';
import axios from 'axios';
import { _checkAuthorizationCookie } from 'ftdgomez-utils';

const producto = ({product, dolar, related, userInfo}) => {
	const { addToCart, setShowCart } = useContext(ProductsContext);

	const handleAddToCart = (product) => {
		const added = addToCart({ ...product, qty: 1 });
		if (added) {
			setShowCart(true);
		}
	};
	return (
		<MainLayout userInfo={userInfo}>
			<div className="p-2"></div>
			<div className='bg-white container py-8'>
				<div>
					<Link href='/productos'>
						<a className='p-4 border rounded bg-white inline-block'>Ir Atrás</a>
					</Link>
				</div>
				{
					product !== '' ?

				<div className='block md:grid grid-cols-2 mt-4'>
					<div className='border'>
						<img className='w-full' src={'https://sass.refrigeracionmc.com' + product.productImages.split(',')[0]} />
					</div>
					<div className='p-8 flex flex-col justify-center'>
						<h1 className='font-extrabold capitalize text-2xl mb-2 text-gray-700'>
							{product.productName}
						</h1>
						<h4 className='font-bold text-xl py-2 border-b text-gray-700'>
							${product.productPrice}
							{
								dolar &&
								<span className="text-sm ml-4">(Bsf: {new Intl.NumberFormat("de-DE").format(Number(product.productPrice) * dolar)})</span>
							}
						</h4>
						<p className='pt-2 mb-4 text-sm'>
							{product.productDescription}
						</p>
					{product.stock > 0 ?
					<button
						onClick={() => handleAddToCart(product)}
						className='bg-primary text-sm px-4 py-2 text-white rounded shadow flex items-center hover:bg-primary hover:text-white '>
						<svg
							className='h-4 mr-2'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='currentColor'>
							<path d='M12.5 22h-9.5v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v5.181c.482-.114.982-.181 1.5-.181l.5.025v-7.025h-5v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h12.816c-.553-.576-1.004-1.251-1.316-2zm-5.5-18c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm11.5 11c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z' />
						</svg>
						Añadir a carrito
					</button>
					:
					<div
						className='bg-red-300 text-sm px-4 py-2 text-gray-800 rounded shadow flex items-center'>
						Fuera de stock
					</div>
				}
						<a className="border px-4 py-2 flex items-center justify-between mt-4 text-sm rounded text-white bg-green-500" href={`https://wa.me/584241217659?text=${encodeURIComponent(`Hola! me gustaría tener más información acerca de "${product.productName}" sku: ${product.productSku}.`)}`} target="_blank">
							Consultar por whatsapp
						<svg
							className='h-7 text-green-500'
							fill='white'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'>
							<path d='M12.036 5.339c-3.635 0-6.591 2.956-6.593 6.589-.001 1.483.434 2.594 1.164 3.756l-.666 2.432 2.494-.654c1.117.663 2.184 1.061 3.595 1.061 3.632 0 6.591-2.956 6.592-6.59.003-3.641-2.942-6.593-6.586-6.594zm3.876 9.423c-.165.463-.957.885-1.337.942-.341.051-.773.072-1.248-.078-.288-.091-.657-.213-1.129-.417-1.987-.858-3.285-2.859-3.384-2.991-.099-.132-.809-1.074-.809-2.049 0-.975.512-1.454.693-1.653.182-.2.396-.25.528-.25l.38.007c.122.006.285-.046.446.34.165.397.561 1.372.611 1.471.049.099.083.215.016.347-.066.132-.099.215-.198.33l-.297.347c-.099.099-.202.206-.087.404.116.198.513.847 1.102 1.372.757.675 1.395.884 1.593.983.198.099.314.083.429-.05.116-.132.495-.578.627-.777s.264-.165.446-.099 1.156.545 1.354.645c.198.099.33.149.38.231.049.085.049.482-.116.945zm3.088-14.762h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-6.967 19.862c-1.327 0-2.634-.333-3.792-.965l-4.203 1.103 1.125-4.108c-.694-1.202-1.059-2.566-1.058-3.964.002-4.372 3.558-7.928 7.928-7.928 2.121.001 4.112.827 5.609 2.325s2.321 3.491 2.32 5.609c-.002 4.372-3.559 7.928-7.929 7.928z' />
						</svg>
					</a>
					</div>
				</div>
					: <p className="p-4">Oops! parece que este producto no existe.</p>
				}
			</div>

			<article className='container bg-white py-8 mt-4'>
				<h2 className='text-2xl font-extrabold mb-4'>
					Quizá te pueda interesar:
				</h2>
				<div className='md:grid grid-cols-3 gap-4'>
					{related.map((item) => (
						<ProductCard key={item.id} badge='Destacado' product={item} buttons={false} />
					))}
				</div>
			</article>
		</MainLayout>
	);
};

export async function getServerSideProps(context) {
	try {
		const userInfo = context.req.cookies[USER_COOKIE] || false;
		console.log(!userInfo ? 'user is not logged in' : 'user is logged in');
		const sku = context.query.sku
		if (!sku) throw new Error('SKU invalid');
		let productResponse = await axios.get(API_URL + 'ecommerce/' + sku );
		// const dolarResponse = await axios.get(API_URL + 'dolar');
		console.log('product -> ',productResponse.data.product)
		return {
			props: {
				product: productResponse.data.product,
				// dolar: dolarResponse.data.dolar,
				related: productResponse.data.related,
				userInfo: userInfo
			}
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true
		}
	}
}

export default producto;
