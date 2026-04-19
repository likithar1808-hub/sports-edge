import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center"
      data-ocid="empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
        {icon || <PackageSearch size={32} />}
      </div>
      <div>
        <h3 className="font-display font-semibold text-foreground mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
      </div>
      {action &&
        (action.href ? (
          <Button asChild data-ocid="empty_state.action_button">
            <Link to={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button
            onClick={action.onClick}
            data-ocid="empty_state.action_button"
          >
            {action.label}
          </Button>
        ))}
    </div>
  );
}
