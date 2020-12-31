import React from 'react';
import { MainLayout } from '../layout/MainLayout';

const BlogItem = () => {
	return (
		<div className='mt-6'>
			<div className='max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md'>
				<div className='mt-2'>
					<a
						href='/singlepost'
						className='text-2xl text-gray-700 font-bold hover:underline'>
						Por qué comprar cosas aquí es genial pt1
					</a>
					<p className='mt-2 text-gray-600'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
						expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
						enim reprehenderit nisi, accusamus delectus nihil quis facere in
						modi ratione libero!
					</p>
				</div>
				<div className='flex justify-between items-center mt-4'>
					<a
						href='/singlepost'
						className='text-primary border p-4 rounded hover:underline'>
						Leer Más
					</a>
					<a
						href='/singlepost'
						className='px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500'>
						Artículo
					</a>
				</div>
			</div>
		</div>
	);
};

const blog = () => {
	return (
		<MainLayout>
			<div className='container'>
				<BlogItem />
				<BlogItem />
				<BlogItem />
				<BlogItem />
				<BlogItem />
			</div>
		</MainLayout>
	);
};

export default blog;
