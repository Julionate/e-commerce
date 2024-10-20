interface CardProps {
  img?: string;
  imgAlt?: string;
  brand?: string;
  product?: string;
  price?: string;
}

export default function HorizontalCard({
  img = '',
  imgAlt = '',
  brand = 'Brand Name',
  product = 'Product Name',
  price = '0',
}: CardProps) {
  return (
    <>
      <div className="h-1 w-full bg-gray-100 dark:bg-slate-800 rounded-full first:hidden"></div>
      <div className="h-36 min-w-full bg-slate-50/25 dark:bg-slate-800 grid-cols-[2fr,4fr,0.5fr] lg:grid-cols-[1fr,4fr,0.5fr] grid rounded-md shadow-sm dark:shadow-white/5 hover:shadow-lg border-black/5 dark:border-white/5 dark:hover:shadow-white/5 overflow-hidden transition-all">
        <img
          className="w-full h-full object-cover"
          src={img}
          alt={imgAlt}
        ></img>
        <div className="p-2 overflow-hidden">
          <p className="font-semibold">{brand}</p>
          <p className="font-semibold text-xl break-words overflow-ellipsis">
            {product}
          </p>
        </div>
        <div className="p-2 font-semibold">${price}</div>
      </div>
    </>
  );
}
