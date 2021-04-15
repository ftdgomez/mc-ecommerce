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
import { API_URL } from '../constant';

function setCookie(cname, cvalue, exdays = 7) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

const register = ({ redirectto }) => {
	const router = useRouter();
	const [values, handleChange] = useForm({
		name: '',
		email: '',
		password: '',
		password2: '',
		cookies: false,
		remember: false,
		address: '',
		phone: ''
	});

	const [error, setError] = useState(false);
	const { handleUserInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		if (
			values.email === '' ||
			values.password === '' ||
			values.password2 === '' ||
			values.name === '' ||
			values.phone === ''
		) {
			toast.error('Todos los campos son obligatorios.');
			setError(true);
			setLoading(false)
		} else if (values.cookies !== 'true') {
			toast.error(
				'Lo siento, debes aceptar las políticas de privacidad para poder crear una cuenta.'
			);
		} else if (values.password !== values.password2) {
			toast.error('Las contraseñas no coinciden.');
			handleChange({ password: '' });
			handleChange({ password2: '' });
			setLoading(false)
		} else {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				const response = await axios.post(
					`${API_URL}ecommerce/client/`,
					values,
					config
				);
				const { data } = response
				console.log(response)
				if (!data){
					alert('ha ocurrido un error inesperado...')
				}
				if (response.status === 200){
				handleUserInfo(data);
				localStorage.setItem('userInfo', JSON.stringify(data));
				setCookie('userInfo', data);
				router.push('/' + (redirectto ? redirectto : ''));
				}
			} catch (error) {
				console.log(error);
				toast.error('Error,' + error.toString())
				setLoading(false)
			}
		}
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
							name='name'
							type='text'
							placeholder='John Doe'
							label='Su Nombre'
							value={values.name}
							handler={handleChange}
							error={error && values.name === '' && error}
						/>
						<FormItem
							name='email'
							type='email'
							placeholder='example@domain.com'
							label='Su Email'
							value={values.email}
							handler={handleChange}
							error={error && values.email === '' && error}
						/>
						<FormItem
							name='phone'
							type='text'
							placeholder='teléfono de contacto'
							label='Teléfono de contacto'
							value={values.phone}
							handler={handleChange}
							error={error && values.phone === '' && error}
						/>
						<FormItem
							name='address'
							type='text'
							placeholder='su dirección'
							label='Dirección de entrega (opcional)'
							value={values.address}
							handler={handleChange}
							error={error && values.phone === '' && error}
						/>
						<FormItem
							name='password'
							type='password'
							placeholder='Escriba aquí su contraseña'
							label='Su Contraseña'
							value={values.password}
							handler={handleChange}
							error={error && values.password === '' && error}
						/>
						<FormItem
							name='password2'
							type='password'
							placeholder='Repetir Contraseña'
							label='Repetir Contraseña'
							value={values.password2}
							handler={handleChange}
							error={error && values.password2 === '' && error}
						/>
						<div className='flex items-center'>
							<FormItem
								name='cookies'
								type='checkbox'
								handler={handleChange}
								value={!values.cookies}
							/>
							<label
								htmlFor='cookies'
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
								handler={handleChange}
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
