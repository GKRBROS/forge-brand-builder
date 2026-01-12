import { cn } from "@/lib/utils";

interface FormSectionProps {
  number: number;
  title: string;
  subtitle?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({
  number,
  title,
  subtitle,
  required,
  error,
  children,
  className,
}: FormSectionProps) => {
  return (
    <section className={cn("bg-card rounded-lg p-6 border border-border shadow-sm", error && "border-red-500", className)}>
      <div className="flex items-start gap-4 mb-5">
        <span className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold",
          error ? "border-red-500 text-red-500" : "border-foreground text-foreground"
        )}>
          {number}
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">
            {title}
            {required && <span className="text-accent ml-1">*</span>}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>
      </div>
      <div className="ml-12">{children}</div>
    </section>
  );
};

export default FormSection;
