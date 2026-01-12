import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface LogoTypeCardProps {
  type: string;
  label: string;
  malayalamLabel: string;
  description: string;
  examples: { name: string; logo: string }[];
  selected: boolean;
  onSelect: () => void;
}

const LogoTypeCard = ({
  type,
  label,
  malayalamLabel,
  description,
  examples,
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
          : "border-border bg-card"
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-foreground rounded-full flex items-center justify-center z-10">
          <Check className="w-3 h-3 text-background" />
        </div>
      )}

      {/* Logo Grid - 2x2 layout */}
      <div className="grid grid-cols-2 gap-3 mb-4 w-full">
        {examples.slice(0, 4).map((example) => (
          <div
            key={example.name}
            className="relative group/logo flex items-center justify-center p-3 bg-muted rounded-md min-h-[120px]"
          >
            <img
              src={example.logo}
              alt={example.name}
              className="h-[100px] w-auto max-w-full object-contain transition-transform duration-200 group-hover/logo:scale-105"
            />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap bg-card px-2 py-0.5 rounded-full border">
              {example.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <h3 className="font-semibold text-foreground">{label}</h3>
        {malayalamLabel && <p className="text-sm text-muted-foreground">{malayalamLabel}</p>}
        <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
    </button>
  );
};

export default LogoTypeCard;
