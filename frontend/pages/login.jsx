import React, { useState } from 'react';
import { FormBody, FormItem, FormPage } from '../components/Form';
import { Button } from '../components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { StyledLink } from '../components/StyledLink';
import { useForm } from '../hooks/useForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import { API_URL, USER_COOKIE } from '../constant';
import { _checkAuthorizationCookie, _fetch } from 'ftdgomez-utils';

function setCookie(cname, cvalue, exdays = 7) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

const login = ({ redirectto }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useForm({
		email: '',
		password: '',
		remember: false,
	});
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		if (values.email === '' || values.password === '') {
			toast.error('Los campos están vacíos.');
			setLoading(false)
			return;
		}
		try {
			const res = await _fetch(API_URL + 'auth?ecommerce=true', 'POST', {
				username:  values.email,
				password: values.password
			});
			console.log(res)

			localStorage.setItem(USER_COOKIE, JSON.stringify(res));
			setCookie(USER_COOKIE, res);
			router.push('/' + (redirectto ? redirectto : ''));
		} catch (error) {
			setValues({...values, password: '' });
			setLoading(false)
			console.log(error);
			toast.error('Email o contraseña inválidos.');
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
						<h1 className='text-xl text-gray-700 font-bold'>¡Qué gusto tenerte por aquí!</h1>
						<p className='mb-4 text-gray-500 text-sm'>
							¿No tienes una cuenta?{' '}
							<StyledLink to='/register'>Regístrate</StyledLink>
						</p>
						<FormItem
							name='email'
							type='email'
							placeholder='example@domain.com'
							label='Su Email'
							value={values.email}
							handler={setValues}
							error={error && values.email === '' && error}
						/>
						<FormItem
							name='password'
							type='password'
							placeholder='************'
							label='Su Contraseña'
							value={values.password}
							handler={setValues}
							error={error && values.password === '' && error}
						/>
						<div className='flex items-center'>
							<FormItem
								name='remember'
								type='checkbox'
								value={!values.cookies}
								handler={setValues}
							/>
							<label
								htmlFor='remember'
								className='ml-2 mb-4 block text-sm text-gray-600'>
								Recuérdame
							</label>
						</div>
						<Button>Iniciar Sesión</Button>
					</FormBody>
				</div>
			</main>
			<aside className='col-span-5 bg-secondary hidden md:block'></aside>
		</FormPage>
	);
};

export async function getServerSideProps(context) {
	const userInfo = _checkAuthorizationCookie(context, '/client-panel', USER_COOKIE);
	if (!userInfo.error) {
		return {
			redirect: {
				destination: '/client-panel',
				permanent: false
			}
		}
	} else {
		const redirectto = context.query.redirectTo || ''
		return {
			props: {
				redirectto
			}

		}
	}
}

export default login;
