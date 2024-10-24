import StarsReviewSystem from '../utils/StarsReviewSystem';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  img?: string;
  imgAlt?: string;
  brand?: string;
  product?: string;
  description?: string;
  reviewsCount?: number;
  reviewsRating?: number;
  price?: number;
  discount?: number;
  idProducto: number;
}

export default function Card({
  img = '/placeholder.jpg',
  brand = 'Brand Name',
  product = 'Product Name',
  description = '',
  price = 0,
  discount = 0,
  imgAlt = '',
  reviewsCount = 0,
  reviewsRating = 0,
  idProducto = 0,
}: CardProps) {
  img = img || '/placeholder.jpg';
  const discountPrice = (price * (1 - discount / 100)).toLocaleString('es-ES', {
    maximumFractionDigits: 0,
  });

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${idProducto}`)}
      className="max-h-72 w-full cursor-pointer overflow-hidden rounded-md border border-black/5 bg-slate-50/25 shadow-sm transition-all hover:z-10 hover:scale-[0.95] hover:shadow-lg dark:border-white/5 dark:bg-slate-800 dark:shadow-white/5 dark:hover:shadow-white/10"
    >
      <img src={img} alt={imgAlt} className="h-1/2 w-full object-contain" />
      <div className="p-2">
        <h1>{brand}</h1>
        <p className="font-semibold">{product}</p>
        {description !== null ? <p>{description}</p> : null}
        <StarsReviewSystem count={reviewsCount} valoracion={reviewsRating} />

        {discount !== 0 ? (
          <div className="flex h-8 items-center gap-2">
            <p className="-mt-px text-xl font-semibold">${discountPrice}</p>
            {discount !== 0 ? (
              <p className="flex h-7 items-center rounded-xl bg-sky-400 pl-3 pr-3 text-sm font-semibold text-white">
                -{discount}%
              </p>
            ) : null}
          </div>
        ) : null}

        <p
          className={`-mt-px font-semibold ${discount !== 0 ? 'text-base text-red-400 line-through decoration-1' : 'text-xl'}`}
        >
          ${Number(price).toLocaleString('es-CL')}
        </p>
      </div>
    </div>
  );
}
