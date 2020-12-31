import { createContext, useState } from 'react'


export const ProductsContext = createContext()
const items = [
	{
		name: 'Abrazadera pequeña de metal  Central',
		price: 80,
		pic: 'Abrazadera%20pequeña%20de%20metal_%20Central_2020.jpg',
	},
	{
		name: 'Acople Agitador 11 interno x12 externo Central',
		price: 80,
		pic: 'Acople%20Agitador%2011%20interno%20x12%20externo_Central_2020.jpg',
	},
	{
		name: 'Acople Agitador 11 interno x12 externo Lateral',
		price: 80,
		pic: 'Acople%20Agitador%2011%20interno%20x12%20externo_Lateral_2020.jpg',
	},
	{
		name: 'Acople Black&Decker Generico Central',
		price: 80,
		pic: 'Acople%20Black&Decker%20Generico_Central_2020.jpg',
	},
	{
		name: 'Acople Black&Decker Generico Inferior',
		price: 80,
		pic: 'Acople%20Black&Decker%20Generico_Inferior_2020.jpg',
	},
	{
		name: 'Acople de agitador lavadora Frigidaire-Electrolux Central',
		price: 80,
		pic:
			'Acople%20de%20agitador%20lavadora%20Frigidaire-Electrolux_Central_2020.jpg',
	},
	{
		name: 'Acople de agitador lavadora Frigidaire-Electrolux Delantera',
		price: 80,
		pic:
			'Acople%20de%20agitador%20lavadora%20Frigidaire-Electrolux_Delantera_2020.jpg',
	},
	{
		name: 'Acople de agitador lavadora Frigidaire-Electrolux Trasera',
		price: 80,
		pic:
			'Acople%20de%20agitador%20lavadora%20Frigidaire-Electrolux_Trasera_2020.jpg',
	},
	{
		name: 'Acople de licuadora Black&Decker generico Central',
		price: 80,
		pic: 'Acople%20de%20licuadora%20Black&Decker%20generico_Central_2020.jpg',
	},
];
export const ProductsProvider = ({ children }) => {
    const [productList, setProductList] = useState(items)
    const contextProps = {
        productList,
        setProductList
    }
    return (<ProductsContext.Provider value={contextProps}>{children}</ProductsContext.Provider>)
}