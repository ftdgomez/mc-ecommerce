import Link from 'next/link';
import { useState } from 'react';
import { _formatDate, _setArrayToObject, _checkAuthorizationCookie} from 'ftdgomez-utils'
import { API_URL, USER_COOKIE } from '../constant';

const clientPanelPage = ({ userInfo, transactions, products, vendedores }) => {
  const [showHistorial, setHistorial] = useState(false);
  const states = {
      invoice: 'Procesando pago.',
      deliver: 'Entregado'
  }
  const [view, setView] = useState(transactions?.[0] || []);
  return (
    <>
      <header className="md:fixed top-0 flex items-center justify-between p-4 left-0 w-full">
        <Link href="/productos">
          <a className="bg-white p-2 rounded text-sm">Ir a tienda online</a>
        </Link>
        <Link href="/logout">
          <a className="bg-white p-2 rounded text-sm">Cerrar Sesión</a>
        </Link>
      </header>
      <div className="lg:min-h-screen flex justify-center w-full bg-secondary items-center bg-cool-01">
        <div className="bg-gray-50 lg:grid grid-cols-1 gap-4 m-4 p-4 rounded shadow-2xl w-full max-w-3xl">
          <nav
            className=" border-r w-full p-4 overflow-auto"
            style={{ maxHeight: '480px' }}
          >
            <img src="/logo.svg" className="w-40 h-auto" />
            <h4>Hola de nuevo!</h4>
            <p className="mb-4">{userInfo.clientName}</p>
            {/* <button
              onClick={() => setHistorial(!showHistorial)}
              className="border px-4 block py-2 mb-4 w-full text-left hover:bg-primary"
            >
              Ver Historial De Pedidos
            </button> */}
            {showHistorial && (
              <div>
                {transactions?.map((t) => (
                  <button
                    onClick={() => {
                    setView(t)
                    }}
                    key={'bb' + t.transaction_id}
                    className="border block w-full px-2 py-1 mb-2 text-sm hover:bg-primary"
                  >
                    Orden: {t.transaction_id.slice(-6)}
                  </button>
                ))}
                {transactions?.length < 1 && <p>Aun no tienes un historial de pedidos.</p>}
              </div>
            )}
            <Link href="/" >
                <a className="border bg-blue-200 px-4 block py-2 mb-4 w-full text-left hover:bg-primary">
                   Realizar Nuevo Pedido
                </a>
            </Link>
          </nav>
          <div className="p-4 overflow-auto" style={{ maxHeight: '480px' }}>
            <p>Tu último pedido:</p>
            {
              transactions.length > 0 &&
              <>
              {transactions[0] && 
                <div>
                  <p className="border px-2 py-1 rounded mt-4">ref: {transactions[0].transaction_id.slice(-6)}</p>
                  <p className="border px-2 py-1 rounded mt-4">Estado: {transactions[0].status}</p>
                  <p className="border px-2 py-1 rounded mt-4">Detalles:</p>
                  <div className="border-b p-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                              <th className="text-left">Producto</th>
                              <th className="text-left">Cantidad</th>
                              <th className="text-left">Precio(UND)</th>
                              <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log(transactions[0])}
                          {transactions[0].items.map((x) => (
                            <tr key={'ss' + x.transaction_id} className="border-b">
                              <td className="capitalize">{x.productName}</td>
                              <td>{x.qty}</td>
                              <td>${x.productPrice}</td>
                              <td className="text-center">${(Number(x.productPrice) * Number(x.qty)).toFixed(2)}</td>
                              {/* {products[x.product].nombre} x ( cant {x.qty} UND ) = ${' '}
                              {(products[x.product].precio * x.qty).toFixed(2)} */}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    {/* <p className="text-right border-b p-2">
                      Subtotal: ${m.subtotal}
                    </p>
                    <p className="text-right border-b p-2">Flete: ${m.flete}</p> */}
                    <p className="text-right border-b p-2 text-primary">
                      Total: ${transactions[0].total}
                    </p>
                    {/* <a target="_blank" href={`${API_URL}transaction/${transactions[0].transaction_id}`} rel="noreferrer" className="px-4 py-2 border-primary bg-white border text-sm block">Descargar Comprobante de pedido</a> */}
                  </div>
                </div>}

              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let userInfo = context.req.cookies[USER_COOKIE] || false;
	console.log(!userInfo ? 'user is not logged in' : 'user is logged in');
  if (!userInfo) return { redirect: { destination: '/login'}}
  userInfo = JSON.parse(userInfo)
  console.log(userInfo)
  try {
    const dataResponse = await fetch(API_URL + 'ecommerce/client-panel', {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    const data = await dataResponse.json();
    if (data.error){
      console.log(data.error)
      return {
        notFound: true
      }
    }
    return {
      props: {
        userInfo,
        transactions: data.transactions.reverse(),
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {
      userInfo: {}
    } };
  }
}

export default clientPanelPage;