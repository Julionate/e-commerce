import UserIcon from '../assets/svg icons/UserIcon';
import StarsReviewSystem from '../utils/StarsReviewSystem';

interface Review {
  review: string;
  user: string;
  valoracion: number;
}

export default function Review({ review, user, valoracion }: Review) {
  return (
    <div className="mt-6 flex h-max w-full flex-col gap-2 rounded-lg bg-gray-50 p-4 dark:bg-slate-800">
      <div className="flex items-center gap-2">
        <UserIcon className="h-12 w-12 dark:fill-gray-200" />
        <p className="text-lg font-semibold">{user}</p>
      </div>
      <StarsReviewSystem valoracion={valoracion} />
      <p>{review}</p>
    </div>
  );
}
