import { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import IconArrowLess from '../assets/svg icons/IconArrowLess';

export default function Filters({ setMarcasSeleccionadas }) {
  const [precioInput, setPrecioInput] = useState({ min: 0, max: 100000 });
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colores = ['Negro', 'Blanco', 'Rojo', 'Azul', 'Verde'];

  const handleChange = (object) => {
    setPrecioInput({ ...precioInput, ...object });
  };

  const handleOptions = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setMarcasSeleccionadas((prev) => [...prev, name]);
    } else {
      setMarcasSeleccionadas((prev) =>
        prev.filter((option) => option !== name),
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/products/marcas',
        );
        setMarcas(response.data);
      } catch {
        setError('Ha ocurrido un error al obtener los productos');
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex h-max w-64 flex-row gap-4 self-start overflow-hidden text-ellipsis rounded-lg p-2 text-left shadow-sm md:sticky md:top-[86px] md:ml-32 md:flex-col dark:shadow-white/5">
      <div>
        <h3 className="pr-4 text-lg font-bold text-sky-400">Marcas</h3>
        <div className="h-0.5 w-full bg-sky-400"></div>
        <div className="relative">
          {!loading ? (
            <ul className="max-h-64 overflow-scroll overflow-x-hidden pb-6 pr-4 pt-2">
              {marcas.map((marca, index) => (
                <label
                  className="flex cursor-pointer justify-between"
                  key={index}
                >
                  <input
                    name={marca.marca}
                    onChange={handleOptions}
                    type="checkbox"
                    className="accent-sky-400"
                  />
                  {marca.marca}
                </label>
              ))}
            </ul>
          ) : (
            'Cargando Marcas...'
          )}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-white/0 dark:from-slate-900 dark:to-slate-900/0"></div>
        </div>
      </div>
      <div>
        <h3 className="mb-2 pr-4 text-lg font-bold text-sky-400">Precio</h3>
        <div className="mb-2 h-0.5 w-full bg-sky-400"></div>
        <div className="flex items-center justify-between text-sm">
          <input
            onChange={(e) => handleChange({ min: Number(e.target.value) })}
            className="h-8 w-12 rounded-lg bg-gray-100 p-1 text-black outline-none focus:bg-gray-200"
            placeholder="Min"
          ></input>
          <div className="h-0.5 w-6 rounded-full bg-gray-300" />
          <input
            onChange={(e) => handleChange({ max: Number(e.target.value) })}
            className="h-8 w-12 rounded-lg bg-gray-100 p-1 text-black outline-none focus:bg-gray-200"
            placeholder="Max"
          ></input>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400 text-white">
            <IconArrowLess className="h-8 w-auto rotate-180 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
