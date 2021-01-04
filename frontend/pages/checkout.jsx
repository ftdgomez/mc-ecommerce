import Link from 'next/link';
import React, { useContext } from 'react';
import { Button } from '../components/Button';
import { CartSideBar } from '../components/CartSideBar';
import { StyledLink } from '../components/StyledLink';
import { UserContext } from '../context/userContext';

const checkout = () => {
	const { userInfo } = useContext(UserContext);
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
							<h2 className='ml-2 text-2xl font-bold'>Datos De Cliente</h2>
						</header>
						{!userInfo && (
							<div className='p-4 pl-12'>
								<p className='tex-sm mb-4'>
									¿Mirando la tienda como <b>Invitado</b>? Tendrás la
									posibilidad de guardar tus detalles de cliente para crear una
									cuenta al terminar esta compra.
								</p>
								<form>
									<label for='email' className='text-sm text-gray-600'>
										Dirección de email
									</label>
									<div className='flex'>
										<input
											name='email'
											id='email'
											className='flex-1 w-full block border-gray-300 rounded'
											type='email'
										/>
										<button className='bg-primary text-white px-4 py-2 ml-4 rounded'>
											Continuar
										</button>
									</div>
								</form>
								<p className='text-sm mt-4'>
									¿Ya tienes una cuenta creada?{' '}
									<StyledLink to='/login'>Haz login ahora.</StyledLink>
								</p>
							</div>
						)}
					</section>
					<section>
						<header className='flex items-center border-b rounded p-4'>
							<span className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
								2
							</span>
							<h2 className='ml-2 text-2xl font-bold'>Envio / Recogida</h2>
						</header>
					</section>
					<section>
						<header className='flex items-center border-b rounded p-4'>
							<span className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
								3
							</span>
							<h2 className='ml-2 text-2xl font-bold'>Método de pago</h2>
						</header>
					</section>
				</div>
				<aside>
					<CartSideBar embedded />
				</aside>
			</main>
		</div>
	);
};

export default checkout;
