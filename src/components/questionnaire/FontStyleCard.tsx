import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FontStyleCardProps {
  name: string;
  sample: string;
  fontClass: string;
  image?: string;
  variant?: "dark" | "default";
  blank?: boolean;
  selected: boolean;
  onSelect: () => void;
}

const FontStyleCard = ({
  name,
  sample,
  fontClass,
  image,
  variant = "default",
  blank = false,
  selected,
  onSelect,
}: FontStyleCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full flex items-center justify-center p-3 overflow-hidden rounded-lg border transition-all duration-200",
        "hover:border-foreground hover:shadow-md min-h-[120px] sm:min-h-[140px] md:min-h-[160px]",
        selected
          ? variant === "dark"
            ? "border-foreground bg-foreground text-background shadow-md"
            : "border-foreground bg-card shadow-md"
          : variant === "dark"
            ? "border-border bg-foreground text-background"
            : "border-border bg-card",
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-background" />
        </div>
      )}

      {blank ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="w-full h-full bg-muted" />
          <span className="text-sm font-semibold text-foreground">{name}</span>
        </div>
      ) : image ? (
        <img
          src={image}
          alt={name}
          className="w-4/5 h-auto max-h-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full" />
      )}
    </button>
  );
};

export default FontStyleCard;
