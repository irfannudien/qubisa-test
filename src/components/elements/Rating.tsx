interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center text-yellow-500 py-0 md:pt-2 lg:pt-8">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.174a1 1 0 00.95.69h4.388c.969 0 1.371 1.24.588 1.81l-3.557 2.58a1 1 0 00-.364 1.118l1.358 4.175c.3.921-.755 1.688-1.54 1.118l-3.557-2.58a1 1 0 00-1.176 0l-3.557 2.58c-.784.57-1.838-.197-1.539-1.118l1.358-4.175a1 1 0 00-.364-1.118L2.072 9.6c-.783-.57-.38-1.81.588-1.81h4.388a1 1 0 00.95-.69l1.357-4.174z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
