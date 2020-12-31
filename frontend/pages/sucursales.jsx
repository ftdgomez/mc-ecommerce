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
								Lunes a vier: de 8:30 a.m. a 5:30 p.m. <br />
								Sábados: 9:00 a.m. a 3:00 p.m.
							</p>
							<Button href='/' className='mt-4'>
								Ver Productos Disponibles
							</Button>
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
								Lunes a vier: de 8:30 a.m. a 5:30 p.m. <br />
								Sábados: 9:00 a.m. a 3:00 p.m.
							</p>
							<Button href='/' className='mt-4'>
								Ver Productos Disponibles
							</Button>
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
								Lunes a vier: de 8:30 a.m. a 5:30 p.m. <br />
								Sábados: 9:00 a.m. a 3:00 p.m.
							</p>
							<Button href='/' className='mt-4'>
								Ver Productos Disponibles
							</Button>
						</div>
					</div>
				</div>
				<div>
					<div className='md:grid md:grid-cols-2'>
						<img className='w-full' src='/cementerio.jpeg' />
						<div className='bg-white p-4 md:px-12 flex flex-col justify-center'>
							<h4 className='title'>El Cementerio</h4>
							<p className='mb-4 text-sm'>
								Av. Principal del Cementerio , Centro Comercial Telares Los
								Andes. Sector Verde – Caracas (en la entrada de la puerta 3).
							</p>
							<p className='text-sm border-b border-t py-4'>
								telf: (0212)763.3852 <br />
								mov: (0424)121.7659
							</p>
							<p className='text-sm'>
								Horario: <br />
								Lunes a vier: de 8:30 a.m. a 5:30 p.m. <br />
								Sábados: 9:00 a.m. a 3:00 p.m.
							</p>
							<Button href='/' className='mt-4'>
								Ver Productos Disponibles
							</Button>
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
};

export default sucursales;
