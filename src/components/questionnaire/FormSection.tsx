import { cn } from "@/lib/utils";

interface FormSectionProps {
  number: number;
  title: string;
  subtitle?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({
  number,
  title,
  subtitle,
  required,
  children,
  className,
}: FormSectionProps) => {
  return (
    <section className={cn("bg-card rounded-2xl p-6 shadow-sm border border-border", className)}>
      <div className="flex items-start gap-4 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
          {number}
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">
            {title}
            {required && <span className="text-destructive ml-1">*</span>}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="ml-12">{children}</div>
    </section>
  );
};

export default FormSection;
