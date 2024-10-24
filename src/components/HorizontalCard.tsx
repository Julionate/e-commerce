interface CardProps {
  img?: string;
  imgAlt?: string;
  brand?: string;
  product?: string;
  price?: number;
  discount?: number;
  stock?: number;
}

export default function HorizontalCard({
  img = '/placeholder.jpg',
  imgAlt = '',
  brand = 'Brand Name',
  product = 'Product Name',
  price = 0,
  discount = 0,
  stock = 0,
}: CardProps) {
  img = img ?? '/placeholder.jpg';
  const discountPrice =
    discount === 0 ? null : price - price * (discount / 100);
  return (
    <>
      <div className="h-1 w-full rounded-full bg-gray-100 first:hidden dark:bg-slate-800"></div>
      <div className="grid h-36 min-w-full grid-cols-[2fr,4fr,0.5fr] overflow-hidden rounded-md border-black/5 bg-slate-50/25 shadow-sm transition-all hover:shadow-lg lg:grid-cols-[1fr,4fr,0.5fr] dark:border-white/5 dark:bg-slate-800 dark:shadow-white/5 dark:hover:shadow-white/5">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt={imgAlt}
        ></img>
        <div className="overflow-hidden p-2">
          <p className="font-semibold">{brand}</p>
          <p className="overflow-ellipsis break-words text-xl font-semibold">
            {product}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between p-2 font-semibold">
          <div>
            {discount > 0 ? (
              <>
                <span className="block text-red-400 line-through decoration-1">
                  ${price.toLocaleString('es-CL')}
                </span>
                <span>
                  $
                  {discountPrice?.toLocaleString('es-CL', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </>
            ) : (
              <span>${price.toLocaleString('es-CL')}</span>
            )}
          </div>
          {stock > 0 ? (
            <span className="text-green-500">En stock</span>
          ) : (
            <span className="text-red-400">Fuera de stock</span>
          )}
          <div className="h-8 w-28 bg-slate-700">Insertar weas</div>
        </div>
      </div>
    </>
  );
}
