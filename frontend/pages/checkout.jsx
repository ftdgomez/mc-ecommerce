import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { CartSideBar } from '../components/CartSideBar';
import { StyledLink } from '../components/StyledLink';
import { API_URL } from '../constant';
import { UserContext } from '../context/userContext';
import {FaShippingFast, FaStore } from 'react-icons/fa'

const checkout = ({ stores }) => {
	const { userInfo, handleUserInfo } = useContext(UserContext);
	const [shipping, setShipping] = useState('')
	const [values, setValues] = useState({
		shippingInfo: '',
		paymentMethod: '',
		store_id: ''
	});

	useEffect(()=>{
		if (!userInfo){
			const localuser = window.localStorage.getItem('userInfo');
			if (localuser){
				console.log(localuser)
				handleUserInfo(JSON.parse(localuser));
			}
		}
	},[])

	return (
		<div className='h-screen'>
			<header className='bg-gray-100 border-b'>
				<div className='container-xl py-8'>
					<h1 className='text-3xl'>Terminar Compra</h1>
					<Link href='/'>
						<a>¿Volver a la tienda?</a>
					</Link>
				</div>
			</header>
			<main className='container-xl md:grid grid-cols-3 gap-4'>
				<div className='col-span-2 md:w-3/4'>
					<section>
						<header className='flex items-center border-b rounded p-4'>
							<span className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
								1
							</span>
							<h2 className={['ml-2 text-2xl font-bold', userInfo ? 'text-primary' : ''].join(' ')}>Datos De Cliente</h2>
						</header>
						{!userInfo && (
							<div className='md:p-4 md:pl-12'>
								<p className='tex-sm mb-4'>
									¿Mirando la tienda como <b>Invitado</b>? 
								</p>
								<Link href="/register?redirectto=checkout"><a className="px-4 py-2 bg-primary rounded text-white w-full block max-w-xs font-bold">Crear Cuenta</a></Link>
								<p className='text-sm mt-4'>
									¿Ya tienes una cuenta creada?{' '}
									<StyledLink to='/login?redireccto=checkout'>Haz login ahora.</StyledLink>
								</p>
							</div>
						)}
					</section>
					<section>
						<header className='flex items-center border-b rounded md:p-4'>
							<span className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
								2
							</span>
							<h2 className='ml-2 text-2xl font-bold'>Envio / Recogida</h2>
						</header>

						{userInfo &&
							<div className='md:p-4 md:pl-12'>
								<div className="lg:grid grid-cols-2 gap-4">
									<button onClick={()=>setShipping('recogida')} className="border p-4 hover:bg-primary rounded flex flex-col items-center justify-center">
										<p className="text-4xl">
											<FaStore />
										</p>
										<p>Recoger en tienda</p>
									</button>
									<button onClick={()=>setShipping('envio')} className="border p-4 hover:bg-primary rounded flex flex-col items-center justify-center">
										<p className="text-4xl">
											<FaShippingFast />
										</p>
										<p>Envar a dirección</p>
									</button>
								</div>
								{ shipping === 'envio' &&
									<input onChange={(e)=>setValues({...values, shippingInfo: `envio a: ${e.target.value}`})} className="border w-full px-4 py-2 text-base mt-3 block focus:border-primary" type="text" placeholder="dirección de envio" />
								}
								{
									shipping === 'recogida' && 
									<select className="w-full block" onChange={(e)=>setValues({...values, shippingInfo: e.target.value})} className="px-4 py-2 mt-3 capitalize">
										<option value="">Seleccione una tienda.</option>
										{stores.map( s => <option key={s.email} value={s.id}>{s.store_name}</option>)}	
									</select>
								}
							</div>
						}
					</section>

					<section>
						<header className='flex items-center border-b rounded md:p-4'>
							<span className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
								3
							</span>
							<h2 className='ml-2 text-2xl font-bold'>Método de pago</h2>
						</header>
						<div className="lg:pl-12">
							<div className="lg:grid grid-cols-4 gap-4 mt-4">
								<div className='flex justify-center border p-2 flex-col items-center text-center'>
									<img className='h-8' src='/zelle.png' />
								</div>
								<div className='flex justify-center border p-2 flex-col items-center text-center'>
									<img className='h-12' src='/trans.png' />
									<h4 className='text-gray-600'>Transferencia Bancaria</h4>
								</div>
								<div className='flex justify-center border p-2 flex-col items-center text-center'>
									<img className='h-12' src='/efe.png' />
									<h4 className='text-gray-600'>Efectivo</h4>
								</div>
								<div className='flex justify-center flex-col border p-2 items-center text-center'>
									<img className='h-6' src='/paypal.png' />
								</div>
							</div>
							<input type="text" placeholder="Referencia de su pago" className="px-4 py-2 border block w-full mt-3" />
						</div>
					</section>
				</div>
				<aside>
					{userInfo && <div className="border mb-2 p-4 rounded">
						<h4 className="font-bold">Detalles del cliente:</h4>	
						<p className="border-b pb-1 mb-1">Nombre: {userInfo.name}</p>
						<p className="border-b pb-1 mb-1">Email: {userInfo.email}</p>
						<p className="border-b pb-1 mb-1">Teléfono de contacto: {userInfo.phone}</p>
						<p className="border-b pb-1 mb-1">Dirección de entrega: {userInfo.address || 'N/A'}</p>
						</div>}
					<CartSideBar embedded />
				</aside>
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	try {
		const stores = await (await fetch(API_URL + 'ecommerce/stores')).json();
		console.log(stores)
		return {
			props: {
				stores
			}
		}
	} catch (error) {
		console.log(error)
		return{
			props: {
				stores: []
			}
		} 
	}
}

export default checkout;
