import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const addToCart = (product) => {
    const isAddedToCart = productCart.filter((p) => p.id === product.id);
    console.log(isAddedToCart);
    if (isAddedToCart.length > 0) {
      toast.error('Ya has agregado ese producto al carrito!');
      return undefined;
    } else {
      setProductCart([...productCart, product]);
      localStorage.setItem(
        'productCart',
        JSON.stringify([...productCart, product]),
      );
      return true;
    }
  };
  const removeFromCart = (product) => {
    setProductCart(productCart.filter((p) => p.id !== product.id));
      localStorage.setItem(
        'productCart',
        JSON.stringify([...productCart.filter((p) => p.id !== product.id)]),
      );
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
