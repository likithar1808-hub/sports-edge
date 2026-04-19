interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullPage?: boolean;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
};

export function LoadingSpinner({
  size = "md",
  text,
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} rounded-full border-primary/30 border-t-accent animate-spin`}
        role="status"
        aria-label={text || "Loading"}
      />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="loading_state"
      >
        {spinner}
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center py-8"
      data-ocid="loading_state"
    >
      {spinner}
    </div>
  );
}
