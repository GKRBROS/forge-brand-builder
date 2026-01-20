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
        "relative flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200",
        "hover:border-foreground hover:shadow-md min-h-[140px] md:min-h-[160px]",
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
        <div className="w-full mb-3 h-20 md:h-24" />
      ) : image ? (
        <div className="w-full mb-3 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-32 md:h-40 lg:h-48 object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <>
          <span
            className={cn(
              "text-base md:text-lg mb-2 text-center leading-tight",
              fontClass,
            )}
          >
            {sample}
          </span>
          <span className={cn("text-xs text-muted-foreground mb-1", fontClass)}>
            Aa Bb Cc 123
          </span>
        </>
      )}
      <span className="text-xs font-medium text-foreground mt-1">{name}</span>
    </button>
  );
};

export default FontStyleCard;
