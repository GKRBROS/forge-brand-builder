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
        "group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 text-left w-full",
        "hover:shadow-lg hover:scale-[1.02] hover:border-primary",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:bg-accent/50"
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center z-10">
          <Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}

      {/* Logo Grid - 3x2 layout */}
      <div className="grid grid-cols-3 gap-3 mb-4 w-full">
        {examples.slice(0, 6).map((example) => (
          <div
            key={example.name}
            className="relative group/logo flex items-center justify-center p-3 bg-background/50 rounded-lg min-h-[80px]"
          >
            <img
              src={example.logo}
              alt={example.name}
              className="h-[75px] w-auto max-w-full object-contain transition-transform duration-300 group-hover/logo:scale-110"
            />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap bg-background/90 px-1 rounded">
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
