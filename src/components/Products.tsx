import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Filters from './Filters';
import Loading from './Loading';
import IconDanger from '../assets/svg icons/IconDanger';

interface Product {
  idProducto: number;
  Nombre: string;
  Marca: string;
  Precio: number;
  Descuento: number;
  Valoracion: number;
  Criticas: number;
  ImagenURL: string;
  ImagenDescripcion: string;
}

export default function Products({ submitInput }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/products/search',
          {
            params: {
              page,
              search: submitInput,
              marcas: marcasSeleccionadas.join(','),
              min: minPrice,
              max: maxPrice,
            },
          },
        );
        setProducts(response.data);
        setError(null);
      } catch {
        setError('Ha ocurrido un error al obtener los productos');
      }
      setLoading(false);
    };
    fetchProducts();
  }, [page, submitInput, marcasSeleccionadas, reload]);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="animate-pulse text-xl font-semibold">
          Cargando productos
        </h1>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex w-max items-center justify-center gap-2 rounded-md bg-red-700/15 px-4 py-1 text-xl font-semibold text-red-400 dark:bg-red-700/15">
          <IconDanger className="h-7 w-7 fill-red-400" />
          <h1 className="">Ha ocurrido un error al cargar los productos</h1>
        </div>
        <button
          onClick={() => {
            setReload(reload + 1);
            setLoading(true);
          }}
          className="rounded-md hover:text-neutral-500"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <>
      <Filters
        setMarcasSeleccionadas={setMarcasSeleccionadas}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        reload={reload}
        setReload={setReload}
      />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="grid w-3/4 grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] place-items-center gap-3">
          {products.map((product, index) => (
            <Card
              key={index}
              idProducto={product.idProducto}
              product={product.Nombre}
              img={product.ImagenURL}
              imgAlt={product.ImagenDescripcion}
              brand={product.Marca}
              price={product.Precio}
              discount={product.Descuento}
              reviewsCount={product.Criticas}
              reviewsRating={product.Valoracion}
            />
          ))}
        </div>
        <div className="mt-6 flex gap-6">
          <button
            onClick={() => (page > 1 ? setPage(page - 1) : null)}
            className="w-20 rounded-md bg-sky-400 px-2 py-1 font-semibold text-white"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="rounded-md bg-sky-400 px-2 py-1 font-semibold text-white"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}
