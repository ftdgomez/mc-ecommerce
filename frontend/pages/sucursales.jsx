import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Button } from '../components/Button';
const sucursales = () => {
	return (
		<MainLayout>
			<main className='container'>
				<div className='mb-4'>
					<div className='md:grid md:grid-cols-2'>
						<img className='w-full' src='/casanova.jpeg' />
						<div className='bg-white p-4 md:px-12 flex flex-col justify-center'>
							<h4 className='title'>La Casanova</h4>
							<p className='mb-4 text-sm'>
								Av. Casanova, Sabana Grande, Caracas (diagonal a El Arabito,
								frente a Prolicor)
							</p>
							<p className='text-sm border-b border-t py-4'>
								telf: (0212)763.3852 <br />
								mov: (0424)121.7659
							</p>
							<p className='text-sm'>
								Horario: <br />
								LUNES A VIERNES  DE  8.00 AM  HASTA LAS 4 Y 30 PM <br />
     							DIAS SABADOS  DE  8.00 AM  HASTA  LA 2.00PM
							</p>
						</div>
					</div>
				</div>
				<div className='mb-4'>
					<div className='md:grid md:grid-cols-2'>
						<img className='w-full' src='/candelaria.jpeg' />
						<div className='bg-white p-4 md:px-12 flex flex-col justify-center'>
							<h4 className='title'>La Candelaria</h4>
							<p className='mb-4 text-sm'>
								Esquina Avilanes, La Candelaria, Caracas (detrás del Centro
								Comercial Casa Bera).
							</p>
							<p className='text-sm border-b border-t py-4'>
								telf: (0212)763.3852 <br />
								mov: (0424)121.7659
							</p>
					<p className='text-sm'>
								Horario: <br />
								LUNES A VIERNES  DE  8.00 AM  HASTA LAS 4 Y 30 PM <br />
     							DIAS SABADOS  DE  8.00 AM  HASTA  LA 2.00PM
							</p>
						</div>
					</div>
				</div>
				<div className='mb-4'>
					<div className='md:grid md:grid-cols-2'>
						<img className='w-full' src='/ffaa.jpeg' />
						<div className='bg-white p-4 md:px-12 flex flex-col justify-center'>
							<h4 className='title'>Av. Fuerzas Armadas</h4>
							<p className='mb-4 text-sm'>
								Av. Fuerzas Armadas – Caracas (diagonal a la Wrangler).
							</p>
							<p className='text-sm border-b border-t py-4'>
								telf: (0212)763.3852 <br />
								mov: (0424)121.7659
							</p>
						<p className='text-sm'>
								Horario: <br />
								LUNES A VIERNES  DE  8.00 AM  HASTA LAS 4 Y 30 PM <br />
     							DIAS SABADOS  DE  8.00 AM  HASTA  LA 2.00PM
							</p>
						</div>
					</div>
				</div>
				<div>
					<div className='md:grid md:grid-cols-2'>
						<img className='w-full' src='/placeholder.jpg' />
						<div className='bg-white p-4 md:px-12 flex flex-col justify-center'>
							<h4 className='title'>SAN MARTIN</h4>
							<p className='mb-4 text-sm lowecase'>
							AV. SAN MARTIN  CON CALLE CIRCUNVALACION , EDF RESIDENCIAS CASANAY PB.  LOCAL  C-1  SAN MARTIN- CARACAS  DISTRITO CAPITAL  ZONA POSTAL  1020
							</p>
							<p className='text-sm border-b border-t py-4'>
								telf: (0212)763.3852 <br />
								mov: (0424)121.7659
							</p>
							<p className='text-sm'>
								Horario: <br />
								LUNES A VIERNES  DE  8.00 AM  HASTA LAS 4 Y 30 PM <br />
     							DIAS SABADOS  DE  8.00 AM  HASTA  LA 2.00PM
							</p>
							
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
};

export default sucursales;
