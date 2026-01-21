import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface LogoTypeCardProps {
  type: string;
  label: string;
  malayalamLabel: string;
  description: string;
  image: string;
  imageAlt?: string;
  selected: boolean;
  onSelect: () => void;
}

const LogoTypeCard = ({
  type,
  label,
  malayalamLabel,
  description,
  image,
  imageAlt,
  selected,
  onSelect,
}: LogoTypeCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full flex items-center justify-center p-4 rounded-lg border transition-all duration-200",
        "hover:shadow-md hover:border-foreground min-h-[120px] sm:min-h-[140px] md:min-h-[160px]",
        selected
          ? "border-foreground bg-card shadow-md"
          : "border-border bg-card",
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-foreground rounded-full flex items-center justify-center z-10">
          <Check className="w-3 h-3 text-background" />
        </div>
      )}
      
      <img
        src={image}
        alt={imageAlt || label}
        className="w-full h-full object-contain p-2"
        loading="lazy"
      />
    </button>
  );
};

export default LogoTypeCard;
