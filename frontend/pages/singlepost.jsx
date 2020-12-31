import React from 'react';
import { MainLayout } from '../layout/MainLayout';

const singlepost = () => {
	return (
		<MainLayout>
			<img src='/car2.jpg' />
			<div className='container'>
				<p>contenido del post...</p>
			</div>
		</MainLayout>
	);
};

export default singlepost;
