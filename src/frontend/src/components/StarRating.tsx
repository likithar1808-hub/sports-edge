import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // 0-5
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          onClick={interactive && onChange ? () => onChange(star) : undefined}
          disabled={!interactive}
          aria-label={interactive ? `Rate ${star} stars` : undefined}
          className={`${interactive ? "cursor-pointer hover:scale-110 transition-smooth" : "cursor-default"} disabled:pointer-events-none`}
        >
          <Star
            size={size}
            className={
              star <= Math.round(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
}
