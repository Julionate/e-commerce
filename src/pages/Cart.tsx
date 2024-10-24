import { useEffect, useState } from 'react';
import axios from 'axios';
import HorizontalCard from '../components/HorizontalCard';

interface Producto {
  idProducto: number;
  Nombre: string;
  Marca: string;
  ImagenURL: string;
  ImagenDescripcion: string;
  Precio: number;
  Descuento: number;
  CantidadProducto: number;
}

export default function Cart() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [precioTotal, setPrecioTotal] = useState([]);
  const handleCheckout = () => {};

  const calcularTotal = (productos: Producto[]) => {
    return productos.reduce((acumulador: number, producto: Producto) => {
      const precioConDescuento =
        producto.Precio - producto.Precio * (producto.Descuento / 100);
      return acumulador + precioConDescuento;
    }, 0);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductos(response.data);
        setPrecioTotal(calcularTotal(response.data));
      } catch {
        console.error('Ha ocurrido un error:');
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="mb-4 ml-2 text-3xl font-semibold">Productos</h1>
      <div className="grid grid-cols-1 p-2 lg:grid-cols-[2fr,1fr]">
        <div className="flex w-full flex-col gap-2">
          {productos.map((producto, index) => (
            <HorizontalCard
              key={index}
              img={producto.ImagenURL}
              imgAlt={producto.ImagenDescripcion}
              brand={producto.Marca}
              product={producto.Nombre}
              price={producto.Precio}
              discount={producto.Descuento}
              stock={producto.CantidadProducto}
            />
          ))}
        </div>
        <div className="flex w-full justify-center pl-6 pr-6">
          <div className="flex h-max w-full flex-col items-center justify-center rounded-md bg-slate-50/5 p-6 shadow-sm dark:bg-slate-800 dark:shadow-white/5">
            <span className="text-center text-xl font-semibold">
              Información del carrito
            </span>
            <span className="text-base">
              Total de productos: {productos.length}
            </span>
            <span className="text-base">
              Monto total: $
              {precioTotal.toLocaleString('es-CL', {
                maximumFractionDigits: 0,
              })}
            </span>
            <button
              onClick={handleCheckout}
              className="mt-6 h-8 w-max rounded-md bg-sky-400 pl-3 pr-3 font-semibold text-white shadow-sm hover:bg-sky-500"
            >
              Ir al pago
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
