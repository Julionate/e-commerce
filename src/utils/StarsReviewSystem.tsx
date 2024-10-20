import IconStar from '../assets/svg icons/IconStar';
import IconHalfStar from '../assets/svg icons/IconHalfStar';
import IconVoidStar from '../assets/svg icons/IconVoidStar';

interface StarsReviewsProps {
  count?: number;
  valoracion: number;
}

export default function StarsReviewSystem({
  count = 0,
  valoracion = 0,
}: StarsReviewsProps) {
  const star = <IconStar className="h-4 w-4 fill-yellow-400" />;
  const halfStar = <IconHalfStar className="h-4 w-4 fill-yellow-400" />;
  const voidStar = <IconVoidStar className="h-4 w-4 fill-gray-400" />;

  const numberOfStars = Math.round(valoracion * 2) / 2;

  const fullStars = Math.floor(numberOfStars);
  const halfStars = numberOfStars % 1 === 0 ? 0 : 1;
  const voidStars = 5 - fullStars - halfStars;

  const StarContent = [];

  StarContent.push(
    ...Array(fullStars).fill(star),
    ...Array(halfStars).fill(halfStar),
    ...Array(voidStars).fill(voidStar),
  );

  return (
    <div className="flex items-center">
      {StarContent.map((star, index) => (
        <div key={index}>{star}</div>
      ))}
      <span className="ml-1">({count})</span>
    </div>
  );
}
