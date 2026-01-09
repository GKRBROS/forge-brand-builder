import { cn } from "@/lib/utils";

interface FontStyleCardProps {
  name: string;
  sample: string;
  fontClass: string;
  selected: boolean;
  onSelect: () => void;
}

const FontStyleCard = ({
  name,
  sample,
  fontClass,
  selected,
  onSelect,
}: FontStyleCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200",
        "hover:border-primary hover:shadow-md",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <span className={cn("text-2xl mb-1", fontClass)}>{sample}</span>
      <span className="text-xs text-muted-foreground">{name}</span>
    </button>
  );
};

export default FontStyleCard;
