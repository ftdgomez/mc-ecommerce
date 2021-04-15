import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { CartSideBar } from '../components/CartSideBar';
import { StyledLink } from '../components/StyledLink';
import { API_URL } from '../constant';
import { FaShippingFast, FaStore } from 'react-icons/fa'
import { _checkAuthorizationCookie, _fetch, _setArrayToObject } from 'ftdgomez-utils'
import { ProductsContext } from '../context/ProductsContext';
import { toast } from 'react-toastify';
import{ useRouter} from 'next/router';

const checkout = ({ stores, userInfo }) => {
	const {productCart, setProductCart } = useContext(ProductsContext)
	const [shipping, setShipping] = useState('')
	const [values, setValues] = useState({
		shippingInfo: '',
		paymentMethod: '',
		store_id: '',
		nota: ''
	});
	const storesObj = _setArrayToObject(stores, 'id');
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const handleMakeTransaction = async (shippingType) => {
		setLoading(true)
		// invoice needs id, ref, payment_method, paid_at, is_online
		// transaction needs items, currency, total, state, store_id, client_id
		console.log(userInfo)
		const transaction = {
			items: productCart,
			currency: 'usd',
			total: Number(productCart.reduce((prev, curr) => (Number(curr.qty) * Number(curr.price)) + prev,0).toFixed(2)),
			state: 'invoice',
			store_id: values.store_id,
			client_id: userInfo.id,
			nota: values.nota,
			shipping: shippingType === 'recodiga' ? false : true
		}
		const invoice = {
			payment_method: values.paymentMethod,
			paid_at: new Date(),
			is_online: true,
		}
		const response = await _fetch(API_URL + 'ecommerce/create-transaction', 'POST', {transaction, invoice}, {
			Authorization: 'Bearer ' + userInfo.token
		});
		if (response.msg){
			toast.success('Bien! se ha realizado tu pedido con éxito.')
			setProductCart([])
			window.localStorage.removeItem('productCart')
			router.push('/client-panel');
		} else {
			setLoading(false)
			toast.error('Ha ocurrido un error. Por favor inténtalo de nuevo.')
		}
	}

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
        {loading && 
          <div className="bg-black z-50 bg-opacity-80 w-full h-screen fixed top-0 left-0 flex items-center justify-center">
              <div className="absolute top-18 border border-t-4 border-primary rounded-full h-12 w-12 animate-spin"></div>
          </div>
        }
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
								<Link href="/register?redirectTo=checkout"><a className="px-4 py-2 bg-primary rounded text-white w-full block max-w-xs font-bold">Crear Cuenta</a></Link>
								<p className='text-sm mt-4'>
									¿Ya tienes una cuenta creada?{' '}
									<StyledLink to='/login?redirectTo=checkout'>Haz login ahora.</StyledLink>
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
									<button onClick={() => {setShipping('recogida'); setValues({...values, store_id: '', shippingInfo: ''})}} className="border p-4 hover:bg-primary rounded flex flex-col items-center justify-center">
										<p className="text-4xl">
											<FaStore />
										</p>
										<p>Recoger en tienda</p>
									</button>
									<button onClick={() => {setShipping('envio'); setValues({...values, store_id: '', shippingInfo: ''})}} className="border p-4 hover:bg-primary rounded flex flex-col items-center justify-center">
										<p className="text-4xl">
											<FaShippingFast />
										</p>
										<p>Envar a dirección</p>
									</button>
								</div>
								{shipping === 'envio' &&
									<input onChange={(e) => setValues({ ...values, shippingInfo: `envio a: ${e.target.value}` })} className="border w-full px-4 py-2 text-base mt-3 block focus:border-primary" type="text" placeholder="dirección de envio" />
								}
								{
									shipping === 'recogida' &&
									<select className="w-full block" onChange={(e) => setValues({ ...values, store_id: e.target.value })} className="px-4 py-2 mt-3 capitalize">
										<option value="">Seleccione una tienda.</option>
										{stores.map(s => <option key={s.email} value={s.id}>{s.store_name}</option>)}
									</select>
								}
								{
									values.store_id !== '' &&
									<div className="border lg:pl-3 py-2 rounded mt-3">
										<p className="capitalize mb-3">{storesObj[values.store_id]?.store_name}</p>
										<p className="">Dirección: {storesObj[values.store_id]?.address}</p>
									</div>
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
								<div onClick={() => setValues({ ...values, paymentMethod: 'zelle' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'zelle' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-8' src='/zelle.png' />
								</div>
								<div onClick={() => setValues({ ...values, paymentMethod: 'transfer' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'transfer' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-12' src='/trans.png' />
									<h4 className='text-gray-600'>Transferencia Bancaria</h4>
								</div>
								<div onClick={() => setValues({ ...values, paymentMethod: 'efectivo' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'efectivo' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-12' src='/efe.png' />
									<h4 className='text-gray-600'>Efectivo</h4>
								</div>
								<div onClick={() => setValues({ ...values, paymentMethod: 'paypal' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'paypal' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-6' src='/paypal.png' />
								</div>
							</div>
							{values.paymentMethod !== 'efectivo' &&
								<input value={values.nota} onChange={(e)=>setValues({...values, nota: e.target.value})} type="text" placeholder="Referencia de su pago" className="px-4 py-2 border block w-full mt-3" />
							}
							{
								userInfo && shipping !== '' && values.paymentMethod !== '' && values.store_id !== '' && 
							 <button onClick={()=>{
								 if (values.paymentMethod !== 'efectivo'){
									 if (values.nota === ''){
										 return toast.error('Para pagos que no sean en efectivo, debes rellenar la referencia de pago.')
									 } 								 }
								 return handleMakeTransaction('recogida')
							 }} className="bg-primary text-white rounded block w-full py-2 mt-3">Realizar Pedido (Recogida)</button>
							}
							{
								userInfo && shipping !== '' && values.paymentMethod !== '' && values.shippingInfo !== '' && 
							 <button onClick={()=>{
								 if (values.paymentMethod !== 'efectivo'){
									 if (values.nota === ''){
										 return toast.error('Para pagos que no sean en efectivo, debes rellenar la referencia de pago.')
									 } 								 }
								 return handleMakeTransaction('envio')
							 }} className="bg-primary text-white rounded block w-full py-2 mt-3">Realizar Pedido (Envio)</button>
							}
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
		const userCookie = _checkAuthorizationCookie(context, '/')
		const userInfo = userCookie.error ? false : userCookie
		return {
			props: {
				stores,
				userInfo
			}
		}
	} catch (error) {
		return {
			props: {
				stores: []
			}
		}
	}
}

export default checkout;
