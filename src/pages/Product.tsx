import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarsReviewSystem from '../utils/StarsReviewSystem';
import axios from 'axios';
import ProductReviews from '../components/ProductReviews';

export default function Product() {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let Marca,
    Nombre,
    Descripcion,
    Precio,
    Cantidad,
    Descuento,
    Valoracion,
    Criticas;

  if (product && product.producto && product.producto.length > 0) {
    ({
      Marca,
      Nombre,
      Descripcion,
      Precio,
      Cantidad,
      Descuento,
      Valoracion,
      Criticas,
    } = product.producto[0]);
  }

  const PrecioDescuento = (
    Number(Precio) *
    (1 - Number(Descuento) / 100)
  ).toLocaleString('es-ES', {
    maximumFractionDigits: 0,
  });

  Precio = Number(Precio).toLocaleString('es-ES', {
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/products/product',
          { params: { productId: id } },
        );
        setProducts(response.data);
        setError(null);
      } catch {
        setError('Ha ocurrido un error al obtener los productos');
      }
      setLoading(false);
    };
    fetchProducts();
  }, [id]);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center justify-center gap-6 font-medium md:flex-row md:items-start md:p-6">
        <div className="h-max w-3/4 rounded-lg md:h-[600px] md:w-1/2">
          <img
            className="h-fit max-h-[600px] w-fit rounded-lg object-scale-down"
            src={
              product?.imagenes?.length > 0
                ? product.imagenes[0].ImagenURL
                : '/20240727_201011.jpg'
            }
            alt={
              product?.imagenes?.length > 0
                ? product.imagenes[0].ImagenDescripcion || 'Imagen del producto'
                : 'Imagen por defecto'
            }
          />
        </div>
        <div className="flex h-max w-3/4 flex-col rounded-lg border-black/5 bg-slate-50/10 p-6 shadow-md md:w-96 dark:border-white/5 dark:bg-slate-800 dark:shadow-white/5">
          <h2 className="text-xl font-semibold text-sky-400">{Marca}</h2>
          <h1 className="text-2xl font-bold">{Nombre}</h1>
          <StarsReviewSystem valoracion={Valoracion} count={Criticas} />
          <div className="mb-4 mt-2 flex flex-col text-xl font-medium">
            {Descuento ? (
              <>
                <div className="-mt-2 text-base text-red-400 line-through">
                  ${Precio}
                </div>
                <div className="flex gap-2">
                  ${PrecioDescuento}
                  <span className="flex items-center rounded-xl bg-sky-400 px-3 text-sm text-white">
                    -{Descuento}%
                  </span>
                </div>
              </>
            ) : (
              `$${Precio}`
            )}
          </div>
          <div className="">{Descripcion}</div>
          <div className="my-2 h-px w-full bg-black/25 dark:bg-white/25"></div>
          <div className="mb-2 text-right text-base">
            {Cantidad > 0 ? `En stock: ${Cantidad} unidades` : `Fuera de stock`}
          </div>
          <button className="mb-2 h-12 rounded-md bg-sky-400 px-2 py-1 font-semibold text-white hover:bg-sky-500">
            COMPRAR AHORA
          </button>
          <button className="h-12 rounded-md bg-sky-400 px-2 py-1 font-semibold text-white hover:bg-sky-500">
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
      <ProductReviews />
    </div>
  );
}
