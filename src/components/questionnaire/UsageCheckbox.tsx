import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface UsageCheckboxProps {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}

const UsageCheckbox = ({ label, icon, checked, onChange }: UsageCheckboxProps) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 w-full",
        "hover:border-primary",
        checked
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <div className={cn(
        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
        checked ? "bg-primary border-primary" : "border-muted-foreground/30"
      )}>
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default UsageCheckbox;
