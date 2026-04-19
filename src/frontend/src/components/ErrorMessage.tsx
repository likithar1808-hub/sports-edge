import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-12 px-4 text-center"
      data-ocid="error_state"
    >
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle size={28} className="text-destructive" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          data-ocid="error_state.retry_button"
        >
          <RefreshCw size={14} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
