import { cn } from "@/lib/utils";

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
      <div className="flex gap-2 mb-3 h-12 items-center justify-center">
        {examples.map((example) => (
          <div
            key={example.name}
            className="relative group/logo"
          >
            <img
              src={example.logo}
              alt={example.name}
              className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap">
              {example.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-foreground">{label}</h3>
        <p className="text-sm text-muted-foreground">{malayalamLabel}</p>
        <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>

      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default LogoTypeCard;
