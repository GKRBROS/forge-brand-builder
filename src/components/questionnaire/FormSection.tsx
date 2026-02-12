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
    <div className={cn("space-y-3", className)}>
      <p className="text-center text-base font-semibold text-muted-foreground">{`Question ${number}`}</p>
      <section
        className={cn(
          "bg-card rounded-lg p-6 border border-border shadow-sm",
          error && "border-red-500",
        )}
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground leading-tight font-geist">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <div className="space-y-3">{children}</div>
      </section>
    </div>
  );
};

export default FormSection;
