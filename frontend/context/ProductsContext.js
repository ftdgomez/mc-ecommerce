import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const ProductsContext = createContext();
const items = [
	{
		title: 'Abrazadera pequeña de metal  Central',
		price: 80,
		pic: 'Abrazadera%20pequeña%20de%20metal_%20Central_2020.jpg',
		_id: 'p-01',
		href: '/producto',
	},
	{
		title: 'Acople Agitador 11 interno x12 externo Central',
		price: 80,
		pic: 'Acople%20Agitador%2011%20interno%20x12%20externo_Central_2020.jpg',
		_id: 'p-02',
		href: '/producto',
	},
	{
		title: 'Acople Agitador 11 interno x12 externo Lateral',
		price: 80,
		pic: 'Acople%20Agitador%2011%20interno%20x12%20externo_Lateral_2020.jpg',
		_id: 'p-03',
		href: '/producto',
	},
	{
		title: 'Acople Black&Decker Generico Central',
		price: 80,
		pic: 'Acople%20Black&Decker%20Generico_Central_2020.jpg',
		_id: 'p-04',
		href: '/producto',
	},
	{
		title: 'Acople Black&Decker Generico Inferior',
		price: 80,
		pic: 'Acople%20Black&Decker%20Generico_Inferior_2020.jpg',

		_id: 'p-05',
		href: '/producto',
	},
	{
		title: 'Acople de agitador lavadora Frigidaire-Electrolux Central',
		price: 80,
		pic:
			'Acople%20de%20agitador%20lavadora%20Frigidaire-Electrolux_Central_2020.jpg',
		_id: 'p-06',
		href: '/producto',
	},
	{
		title: 'Acople de agitador lavadora Frigidaire-Electrolux Delantera',
		price: 80,
		pic:
			'Acople%20de%20agitador%20lavadora%20Frigidaire-Electrolux_Delantera_2020.jpg',
		_id: 'p-07',
		href: '/producto',
	},
	{
		title: 'Acople de agitador lavadora Frigidaire-Electrolux Trasera',
		price: 80,
		pic:
			'Acople%20de%20agitador%20lavadora%20Frigidaire-Electrolux_Trasera_2020.jpg',
		_id: 'p-08',
		href: '/producto',
	},
	{
		title: 'Acople de licuadora Black&Decker generico Central',
		price: 80,
		pic: 'Acople%20de%20licuadora%20Black&Decker%20generico_Central_2020.jpg',
		_id: 'p-09',
		href: '/producto',
	},
];
export const ProductsProvider = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [productList, setProductList] = useState(items);
	const [productCart, setProductCart] = useState([]);
	const addToCart = (product) => {
		const isAddedToCart = productCart.filter((p) => p._id === product._id);
		console.log(isAddedToCart);
		if (isAddedToCart.length > 0) {
			toast.error('Ya has agregado ese producto al carrito!');
			return undefined;
		} else {
			setProductCart([...productCart, product]);
			localStorage.setItem(
				'productCart',
				JSON.stringify([...productCart, product])
			);
			return true;
		}
	};
	const removeFromCart = (product) => {
		setProductCart(productCart.filter((p) => p._id !== product._id));
	};
	const contextProps = {
		productList,
		setProductList,
		productCart,
		setProductCart,
		addToCart,
		removeFromCart,
		showCart,
		setShowCart,
	};
	return (
		<ProductsContext.Provider value={contextProps}>
			{children}
		</ProductsContext.Provider>
	);
};
