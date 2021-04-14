import {UserProvider } from '../context/userContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../global.css'
import { ProductsProvider } from '../context/ProductsContext'
import { useState } from 'react'
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  
  Router.onRouteChangeStart = () => {
    // console.log('onRouteChangeStart triggered');
    setLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    // console.log('onRouteChangeComplete triggered');
    setLoading(false);
  };

  Router.onRouteChangeError = () => {
    console.log('onRouteChangeError triggered');
  };

  return (
    <UserProvider>
      <ProductsProvider>
        <Component {...pageProps} />
        <ToastContainer />
        {loading && 
          <div className="bg-black z-50 bg-opacity-80 w-full h-screen fixed top-0 left-0 flex items-center justify-center">
              <div className="absolute top-18 border border-t-4 border-primary rounded-full h-12 w-12 animate-spin"></div>
          </div>
        }
      </ProductsProvider>
    </UserProvider>
  ) 
}

export default MyApp
