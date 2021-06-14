import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [productCart, setProductCart] = useState([]);

  const addToCart = (product) => {
    const isAddedToCart = productCart.find((p) => p.product_id === product.product_id);
    if (isAddedToCart) {
      toast.error('Ya has agregado ese producto al carrito!');
      return undefined;
    } else {
      setProductCart([...productCart, product]);
      localStorage.setItem(
        'mc_productCart',
        JSON.stringify([...productCart, product]),
      );
      return true;
    }
  };

  const contextProps = {
    productCart,
    setProductCart,
    showCart,
    setShowCart,
    addToCart,
  };
  return (
    <ProductsContext.Provider value={contextProps}>
      {children}
    </ProductsContext.Provider>
  );
};
