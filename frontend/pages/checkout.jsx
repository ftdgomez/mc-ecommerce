import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { CartSideBar } from '../components/CartSideBar';
import { StyledLink } from '../components/StyledLink';
import { API_URL, USER_COOKIE } from '../constant';
import { FaShippingFast, FaStore } from 'react-icons/fa'
import { _checkAuthorizationCookie, _fetch, _setArrayToObject } from 'ftdgomez-utils'
import { ProductsContext } from '../context/ProductsContext';
import { toast } from 'react-toastify';
import{ useRouter} from 'next/router';

const checkout = ({ stores, userInfo }) => {
	const { productCart } = useContext(ProductsContext)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const initialValues = {
		status: 'procesando-pago',
		to: userInfo?.client_id,
		from: false,
		dolarPrice: null,
		currency: 'usd',
		isOnline: true,
		shippingInfo: null,
		paymentDetails: '',
		paymentMethod: '',
		archive: false
	}
	const [values, setValues] = useState(initialValues)

	const handleMakeTransaction = async () => {
		const v = {
			...values,
			items: JSON.stringify(productCart),
			subtotal: productCart.reduce((prev, curr) => prev + (curr.qty * Number(curr.productPrice)), 0),
			total: productCart.reduce((prev, curr) => prev + (curr.qty * Number(curr.productPrice)), 0) + 0 // el útlimo 0 será cambiado por el flete
		}
		const response = _fetch(API_URL + 'ecommerce/transaction', 'POST', v, {
			Authorization: 'Bearer ' + userInfo.token
		})
		console.log(response)
		if (response.error)
		{
			console.log(response.error)
			toast.error('Ha ocurrido un error inesperado')
		}
		else {
			toast.success('Orden enviada con éxito.')
			router.push('/client-panel');
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

			<main className='container-xl md:grid grid-cols-3 gap-4'>
				<div className='col-span-2 md:w-3/4'>
					<section>
						<header className='flex items-center border-b rounded p-4'>
							<span className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
								1
							</span>
							<h2 className={['ml-2 text-2xl font-bold', userInfo ? 'text-primary' : ''].join(' ')}>Datos De Cliente</h2>
							{userInfo &&
							<a href="/logout?redirectTo=login" className="text-sm text-primary ml-3 opacity-40 hover:opacity-100">Iniciar sesión con otra cuenta?</a>}
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
									<button onClick={() => {setValues({...values, from: ''})}} className="border p-4 hover:bg-primary rounded flex flex-col items-center justify-center">
										<p className="text-4xl">
											<FaStore />
										</p>
										<p>Recoger en tienda</p>
									</button>
									<button disabled className="opacity-50 border cursor-not-allowed p-4 rounded flex flex-col items-center justify-center">
										<p className="text-4xl">
											<FaShippingFast />
										</p>
										<p>Envar a dirección</p>
									</button>
								</div>
								{values.shipping === 'envio' &&
									<input value={values.shippingInfo} onChange={(e) => setValues({ ...values, shippingInfo: e.target.value })} className="border w-full px-4 py-2 text-base mt-3 block focus:border-primary" type="text" placeholder="dirección de envio" />
								}
								{
									values.from !== false &&
									<select className="w-full block" onChange={(e) => setValues({ ...values, from: e.target.value })} className="px-4 py-2 mt-3 capitalize">
										<option value="">Seleccione una tienda.</option>
										{stores.map(s => <option key={s.store_id} value={s.store_id}>{s.storeName}</option>)}
									</select>
								}
								{
									values.from?.length > 4 &&
									<div className="border lg:pl-3 py-2 rounded mt-3">
										<p className="capitalize mb-3">{stores.find(s => s.store_id === values.from)?.storeName}</p>
										<p className="">Dirección: {stores.find(s => s.store_id === values.from)?.storeAddress}</p>
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
								<div onClick={() => setValues({ ...values, paymentMethod: 'transferencia' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'transfer' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-12' src='/trans.png' />
									<h4 className='text-gray-600'>Transferencia Bancaria</h4>
								</div>
								<div onClick={() => setValues({ ...values, paymentMethod: 'usd' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'efectivo' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-12' src='/efe.png' />
									<h4 className='text-gray-600'>Efectivo USD</h4>
								</div>
								<div onClick={() => setValues({ ...values, paymentMethod: 'paypal' })} className={['flex justify-center border p-2 flex-col items-center text-center hover:bg-gray-100 cursor-pointer', values.paymentMethod === 'paypal' ? 'bg-blue-100' : ''].join(' ')}>
									<img className='h-6' src='/paypal.png' />
								</div>
							</div>
							{
								values.paymentMethod === 'zelle' && 
								<div className="">
									<h5 className="font-bold">Datos Zelle:</h5>
									<p>grupo.brizzainc@gmail.com</p>
									<p>Grupo brizza Inc</p>
								</div>
							}
							{
								values.paymentMethod === 'transferencia' && 
								<div className="">
									<h5 className="font-bold">Datos Bancarios:</h5>
									<table className="table-auto">
										<thead className="border">
											<tr>
												<th>Banco</th>
												<th>No. De Cuenta</th>
												<th>Empresa</th>
												<th>Rif.</th>
											</tr>
										</thead>
										<tbody>
											<tr className="border-b h-11">
												<td>Banesco</td>
												<td>01340994370001001466</td>
												<td>Inversiones mc 2603</td>
												<td>J-403681171</td>
											</tr>
											<tr className="border-b h-11">
												<td>Mercantil</td>
												<td>01050638711638330166</td>
												<td>Inversiones mc 2603</td>
												<td>J-403681171</td>
											</tr>
											<tr className="border-b h-11">
												<td>Provincial</td>
												<td>01080229600100035265</td>
												<td>inversiones new styles</td>
												<td>J-293774543</td>
											</tr>
										</tbody>
									</table>
									<h5 className="font-bold mb-3">Bofa:</h5>
									<p>
										Grupo brizza Inc <br/> 
										Checking Account  <br/>
										Account Number: 8981-2108-1398 <br/>
										ACH Routing Number: 063100277 <br/>
										Dirección: 839 Bellemeade blvd.  <br/>
										Ciudad: Gretna <br/>
										Estado: Louisiana <br/>
										Código Posta: 70056 <br/>
									</p>
								</div>
							}
							{
								values.paymentMethod === 'paypal' && 
								<div className="">
									<h5 className="font-bold">Datos Paypal:</h5>
									<p>PayPal.me/maikelpoblador</p>
									<p>maikelpoblador@gmail.com</p>
								</div>
							}
							{values.paymentMethod !== 'usd' &&
								<>	
									<p>Introduzca una referencia a su pago realizado para que nuestro equipo pueda confirmalo.</p>
									<input value={values.nota} onChange={(e)=>setValues({...values, paymentDetails: e.target.value})} type="text" placeholder="Referencia de su pago" className="px-4 py-2 border block w-full mt-3" />
								</>
							}
							{/* {
								userInfo && values.shipping !== '' && values.paymentMethod !== '' && values.store_id !== '' && 
							 <button onClick={()=>{
								 if (values.paymentMethod !== 'efectivo'){
									 if (values.nota === ''){
										 return toast.error('Para pagos que no sean en efectivo, debes rellenar la referencia de pago.')
									 } 								 }
								 return handleMakeTransaction('recogida')
							 }} className="bg-primary text-white rounded block w-full py-2 mt-3">Realizar Pedido (Recogida)</button>
							} */}
							{
								userInfo && values.shipping !== '' && values.paymentMethod !== '' && values.shippingInfo !== '' && 
							 <button onClick={()=>{
								 if (values.paymentMethod !== 'usd'){
									 if (values.paymentDetails === ''){
										 return toast.error('Para pagos que no sean en efectivo, debes rellenar la referencia de pago.')
									 } 								 }
								 return handleMakeTransaction()
							 }} className="bg-primary text-white rounded block w-full py-2 mt-3">Realizar Pedido</button>
							}
						</div>
					</section>
				</div>
				<aside>
					{userInfo && <div className="border mb-2 p-4 rounded">
						<h4 className="font-bold">Detalles del cliente:</h4>
						<p className="border-b pb-1 mb-1">Nombre: {userInfo.clientName}</p>
						<p className="border-b pb-1 mb-1">Email: {userInfo.clientEmail}</p>
						<p className="border-b pb-1 mb-1">Teléfono de contacto: {userInfo.clientPhone}</p>
						<p className="border-b pb-1 mb-1">Dirección de entrega: {userInfo.clientAddress || 'N/A'}</p>
					</div>}
					<CartSideBar embedded />
				</aside>
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	try {
		const stores = await (await fetch(API_URL + 'stores')).json();
		const userCookie = _checkAuthorizationCookie(context, '/', USER_COOKIE)
		const userInfo = userCookie.error ? false : userCookie
		console.log(userInfo)
		return {
			props: {
				stores: stores.filter(s => !s.isAdmin).filter(s => s.storeName !== 'deposito'),
				userInfo
			}
		}
	} catch (error) {
		console.log('this error on line 172 of checkout was triggered')
		return {
			props: {
				stores: []
			}
		}
	}
}

export default checkout;
