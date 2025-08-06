
type Props = { rating: number };

const StarIcon = ({ rating }: Props) => {
  const count = Math.round(rating);
  return (
    <span className="flex items-center">
      {[...Array(5)].map((_, i) =>
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="9.9,2.1 12.4,7.4 18.2,7.6 13.8,11.5 15.3,17.2 9.9,14.1 4.5,17.2 6,11.5 1.6,7.6 7.4,7.4 " />
        </svg>
      )}
    </span>
  );
};

export default StarIcon;
