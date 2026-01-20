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
        "group relative flex flex-col items-center p-4 rounded-lg border transition-all duration-200 text-left w-full",
        "hover:shadow-md hover:border-foreground",
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
      <div className="w-full mb-3 rounded-md flex items-center justify-center">
        <img
          src={image}
          alt={imageAlt || label}
          className="w-full h-36 md:h-44 lg:h-48 object-contain"
          loading="lazy"
        />
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-foreground">{label}</h3>
        {malayalamLabel && (
          <p className="text-sm text-muted-foreground">{malayalamLabel}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
    </button>
  );
};

export default LogoTypeCard;
