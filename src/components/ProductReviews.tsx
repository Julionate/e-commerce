import { useState, useEffect } from 'react';
import IconStar from '../assets/svg icons/IconStar';
import Review from './Review';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type ReviewType = {
  Critica: string;
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
  }, [id]);

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

  console.log(reviews);

  return (
    <div className="flex-1 px-32">
      <h1 className="text-3xl font-bold">Reseñas</h1>
      <div className="mt-6 flex h-max w-full flex-col gap-2 rounded-lg bg-gray-50 p-4">
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
            className="resize-y rounded-md bg-gray-50 p-2 outline-none hover:bg-gray-100 focus:bg-gray-100"
            placeholder="Añadir reseña"
            rows={4}
          ></textarea>
        </div>
      </div>
      {reviews.map((review: ReviewType, index) => (
        <Review
          key={index}
          review={review.Critica}
          user="Sample"
          valoracion={review.Valoracion}
        />
      ))}
    </div>
  );
}
