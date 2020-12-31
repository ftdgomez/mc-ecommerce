import { UserContext, UserProvider } from '../context/userContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../global.css'
import { ProductsProvider } from '../context/ProductsContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ProductsProvider>
      <Component {...pageProps} />
      <ToastContainer />

      </ProductsProvider>
    </UserProvider>
  ) 
}

export default MyApp
