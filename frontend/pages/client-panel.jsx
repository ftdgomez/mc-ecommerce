import Link from 'next/link';
import { useState } from 'react';
import { _formatDate, _setArrayToObject, _checkAuthorizationCookie} from 'ftdgomez-utils'
import { API_URL } from '../constant';

const clientPanelPage = ({ userInfo, transactions, products, vendedores }) => {
  const [showHistorial, setHistorial] = useState(false);
  const states = {
      invoice: 'Procesando pago.',
      deliver: 'Entregado'
  }
  const [view, setView] = useState(transactions[0]);
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
            <p className="mb-4">{userInfo.name}</p>
            <button
              onClick={() => setHistorial(!showHistorial)}
              className="border px-4 block py-2 mb-4 w-full text-left hover:bg-primary"
            >
              Ver Historial De Pedidos
            </button>
            {showHistorial && (
              <div>
                {transactions.map((t) => (
                  <button
                    onClick={() => {
                    setView(t)
                    }}
                    key={t._id}
                    className="border block w-full px-2 py-1 mb-2 text-sm hover:bg-primary"
                  >
                    {t._id}
                  </button>
                ))}
                {transactions.length < 1 && <p>Aun no tienes un historial de pedidos.</p>}
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
             {[view].map((m) => (
              <div key={m._id}>
                <p className="border px-2 py-1 rounded mt-4">ref: {m._id}</p>
                <p className="border px-2 py-1 rounded mt-4 bg-yellow-100">
                  Estado: {states[m.state]}
                </p>
                <p className="border px-2 py-1 rounded mt-4">Detalles:</p>
                <div className="border-b p-4">
                    <table>
                        <tr>
                            <th className="text-left">Producto</th>
                            <th>Cantidad</th>
                            <th>Precio(UND)</th>
                            <th>Total</th>
                        </tr>
                  {m.items.map((x) => (
                    <tr key={x.id} className="border-b">
                       <td className="capitalize">{x.product_name}</td>
                       <td>{x.qty}</td>
                       <td>{x.price}</td>
                       <td>{(Number(x.price) * Number(x.qty)).toFixed(2)}</td>
                      {/* {products[x.product].nombre} x ( cant {x.qty} UND ) = ${' '}
                      {(products[x.product].precio * x.qty).toFixed(2)} */}
                    </tr>
                  ))}
                    </table>

                  {/* <p className="text-right border-b p-2">
                    Subtotal: ${m.subtotal}
                  </p>
                  <p className="text-right border-b p-2">Flete: ${m.flete}</p> */}
                  <p className="text-right border-b p-2 text-primary">
                    Total: ${m.total}
                  </p>
                </div>
                <a target="_blank" href={`${API_URL}transaction/${m._id}`} rel="noreferrer" className="px-4 py-2 border-primary bg-white border text-sm">Descargar Comprobante de pedido</a>
                {/* <button className="px-4 py-2 border-green-400 bg-white border text-sm">Contactar con un responsable</button> */}
                {/* {m.pagos.length > 0 && (
                  <div>
                    <h4>Pagos Registrados:</h4>
                    {m.pagos.map((p) => (
                      <p key={p._id} className="border-b text-sm">
                        El {_formatDate(p.date)} por el monto de ${p.monto}{' '}
                        pagado con {p.method}
                      </p>
                    ))}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const userInfo = _checkAuthorizationCookie(context);
  if (userInfo.error) return userInfo.error;
  try {
    const dataResponse = await fetch(API_URL + 'ecommerce/client-panel', {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    const data = await dataResponse.json();
    return {
      props: {
        userInfo,
        transactions: data.reverse(),
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}

export default clientPanelPage;