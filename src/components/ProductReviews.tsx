import { useState, useEffect } from 'react';
import IconStar from '../assets/svg icons/IconStar';
import Review from './Review';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../utils/useAuth';

type ReviewType = {
  Critica: string;
  Usuario: string;
  Valoracion: number;
};

export default function ProductReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [textAreaInput, setTextAreaInput] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:3000/products/product/review',
          {
            params: {
              productId: id,
            },
          },
        );
        setReviews(response.data);
        setError(null);
      } catch {
        setError('Ha ocurrido un error al obtener los productos');
      }
      setLoading(false);
    };
    fetchProducts();
  }, [id, reload]);

  const postReview = async (idProducto, critica, valoracion) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:3000/products/product/post-review',
        {
          idProducto,
          critica,
          valoracion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
          },
        },
      );
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que está fuera del rango de 2xx
        console.error('Usuario no logueado', error.response.data);
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        // Algo sucedió al configurar la solicitud que provocó un error
        console.error('Error al enviar la solicitud:', error.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaInput(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      console.log('subido');
    }
  };

  const starReview = (id: number) => {
    return (
      <IconStar
        className={`h-6 w-6 ${hoverStar >= id || selectedStar >= id ? 'fill-amber-400' : 'fill-gray-500'}`}
        onClick={() => setSelectedStar(id)}
        onMouseEnter={() => setHoverStar(id)}
      />
    );
  };

  const handleReviewSubmit = () => {
    postReview(id, textAreaInput, selectedStar);
    setTimeout(() => {
      setReload(reload + 1);
    }, 800);
  };

  return (
    <div className="flex-1 px-32">
      <h1 className="text-3xl font-bold">Reseñas</h1>
      <div className="mt-6 flex h-max w-full flex-col gap-2 rounded-lg bg-gray-50 p-4 dark:bg-slate-800">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-semibold">
              ¡Accede a una cuenta para publicar una reseña!
            </h2>
            <button
              onClick={() => navigate('/login')}
              className="rounded-lg bg-sky-400 px-2 py-1 font-semibold text-white hover:bg-sky-500"
            >
              Iniciar Sesión
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold">
              ¡Deja una reseña sobre este producto!
            </h2>
            <div className="flex flex-col">
              <h3>Selecciona una valoración</h3>
              <div className="flex gap-1" onMouseLeave={() => setHoverStar(0)}>
                {starReview(1)}
                {starReview(2)}
                {starReview(3)}
                {starReview(4)}
                {starReview(5)}
              </div>
            </div>
            <div className="flex flex-col">
              <h3>Escribe un comentario</h3>
              <textarea
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleInputSubmit(e)}
                className="resize-y rounded-md bg-gray-50 p-2 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                placeholder="Añadir reseña"
                rows={4}
              ></textarea>
            </div>
            <button
              onClick={handleReviewSubmit}
              className="flex w-max items-center justify-center rounded-lg bg-sky-400 px-2 py-1 font-semibold text-white hover:bg-sky-500"
            >
              Publicar
            </button>
          </>
        )}
      </div>
      {reviews.map((review: ReviewType, index) => (
        <Review
          key={index}
          review={review.Critica}
          user={review.Usuario}
          valoracion={review.Valoracion}
        />
      ))}
    </div>
  );
}
