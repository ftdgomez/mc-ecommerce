import React, { useContext, useState } from 'react';
import { FormBody, FormItem, FormPage } from '../components/Form';
import { Button } from '../components/Button';
import Image from 'next/image';
import { StyledLink } from '../components/StyledLink';
import { useForm } from '../hooks/useForm.js';
import { UserContext } from '../context/userContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL, USER_COOKIE } from '../constant';
import { _fetch } from 'ftdgomez-utils';

function setCookie(cname, cvalue, exdays = 7) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

const register = ({ redirectto }) => {
	const router = useRouter();
	const [values, setValues] = useState({
		clientName: '',
		clientEmail: '',
		clientPassword: '',
		clientPassword2: '',
		privacy: false,
		remember: false,
		clientAddress: '',
		clientPhone: ''
	});

    const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();
		const {
			clientEmail,
			clientName,
			clientPhone,
			clientAddress,
			clientPassword,
			clientPassword2,
			remember
		} = values
		setLoading(true)
		if ([clientEmail, clientName, clientPassword, clientPassword2, clientPhone].indexOf('') >= 0) {
			toast.error('Faltan campos obligatorios.');
			setLoading(false)
			return;
		} 
		
		if (!values.privacy) {
			toast.error(
				'Lo siento, debes aceptar las políticas de privacidad para poder crear una cuenta.'
			);
		}
		
		if (clientPassword2 !== clientPassword) {
			toast.error('Las contraseñas no coinciden.');
			setValues({...values, clientPassword: '', clientPassword2: '' });
			setLoading(false)
		}

		try {
			delete values.clientPassword2
			const res = await _fetch(API_URL + 'clients?ecommerce=true', 'POST', values);
			console.log(res)
			if (res.data.error){
				if (res.data.error.includes('clients_clientemail_unique')){
					return toast.error('No puedes utilizar ese email.');
				}
				console.log(res.data.error)
				return toast.error('Error, revisa los datos y vuelve a intentarlo.')
			}
			if (remember)
			{
				localStorage.setItem(USER_COOKIE, JSON.stringify(res.data));
				setCookie(USER_COOKIE, res.data);
				router.push('/', (redirectto ? redirectto : ''));
			}
		} catch (error) {
			console.log(error);
			toast.error('Error,' + error.toString())
		}
		setLoading(false)
	};

	return (
		<FormPage>
			{ loading && 
			<div className="h-screen w-full flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-80">
				<p className="text-white">cargando...</p>
			</div>
			}
			<main className='col-span-3'>
				<div className='flex items-center justify-center w-full h-full'>
					<FormBody handler={handleSubmit}>
						<Link href='/'>
							<a>
								<Image src='/logo.svg' height={123} width={260} />
							</a>
						</Link>
						<h1 className='text-xl text-gray-700 font-bold'>
							Registrar Una Cuenta Nueva
						</h1>
						<p className='mb-4 text-gray-500 text-sm'>
							¿Ya tienes una cuenta?{' '}
							<StyledLink to='/login'>Inicia Sesión</StyledLink>
						</p>
						<FormItem
							name='clientName'
							type='text'
							placeholder='Su nombre'
							label='Su Nombre'
							value={values.clientName}
							handler={(e) => setValues({...values, [e.target.name]: e.target.value})}
						/>
						<FormItem
							name='clientEmail'
							type='email'
							placeholder='example@domain.com'
							label='Su Email'
							value={values.clientEmail}
handler={(e) => setValues({...values, [e.target.name]: e.target.value})}
						/>
						<FormItem
							name='clientPhone'
							type='text'
							placeholder='teléfono de contacto'
							label='Teléfono de contacto'
							value={values.clientPhone}
handler={(e) => setValues({...values, [e.target.name]: e.target.value})}
						/>
						<FormItem
							name='clientAddress'
							type='text'
							placeholder='su dirección'
							label='Dirección de entrega (opcional)'
							value={values.clientAddress}
handler={(e) => setValues({...values, [e.target.name]: e.target.value})}
						/>
						<FormItem
							name='clientPassword'
							type='password'
							placeholder='Escriba aquí su contraseña'
							label='Su Contraseña'
							value={values.clientPassword}
							handler={(e) => setValues({...values, [e.target.name]: e.target.value})}
						/>
						<FormItem
							name='clientPassword2'
							type='password'
							placeholder='Repetir Contraseña'
							label='Repetir Contraseña'
							value={values.clientPassword2}
							handler={(e) => setValues({...values, [e.target.name]: e.target.value})}
						/>
						<div className='flex items-center'>
							<FormItem
								name='privacy'
								type='checkbox'
								handler={(e) => setValues({...values, [e.target.name]: !values[e.target.name]})}
								value={!values.cookies}
							/>
							<label
								htmlFor='privacy'
								className='ml-2 mb-4 block text-sm text-gray-600'>
								Acepto las{' '}
								<StyledLink to='/politicas-de-privacidad'>
									Políticas de privacidad
								</StyledLink>
							</label>
						</div>
						<div className='flex items-center'>
							<FormItem
								name='remember'
								type='checkbox'
								value={!values.remember}
								handler={(e) => setValues({...values, [e.target.name]: !values[e.target.name]})}
							/>
							<label
								htmlFor='remember'
								className='ml-2 mb-4 block text-sm text-gray-600'>
								Mantener sesión iniciada
							</label>
						</div>
						<Button>Registrarme</Button>
					</FormBody>
				</div>
			</main>
			<aside className='col-span-5 bg-secondary hidden md:block'></aside>
		</FormPage>
	);
};

export async function getServerSideProps(context){
	const redirectAddress = context.query.redirectTo
	return {
		props: {
			redirectto: redirectAddress || false
		}
	}
}

export default register;
