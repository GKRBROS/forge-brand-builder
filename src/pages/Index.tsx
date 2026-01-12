import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/questionnaire/FormSection";
import LogoTypeCard from "@/components/questionnaire/LogoTypeCard";
import FontStyleCard from "@/components/questionnaire/FontStyleCard";
import UsageCheckbox from "@/components/questionnaire/UsageCheckbox";
import FileUpload from "@/components/questionnaire/FileUpload";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/hooks/useLanguage";
import { Globe, Smartphone, Share2, Package, Printer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const logoTypes = [
  {
    type: "wordmark",
    label: "Wordmark",
    description: "Text-based logo using the brand name",
    examples: [
      { name: "Google", logo: "https://img.logo.dev/google.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Coca-Cola", logo: "https://img.logo.dev/coca-cola.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "FedEx", logo: "https://img.logo.dev/fedex.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Disney", logo: "https://img.logo.dev/disney.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
    ],
  },
  {
    type: "lettermark",
    label: "Lettermark",
    description: "Initials or abbreviations",
    examples: [
      { name: "IBM", logo: "https://img.logo.dev/ibm.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "HP", logo: "https://img.logo.dev/hp.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "HBO", logo: "https://img.logo.dev/hbo.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "CNN", logo: "https://img.logo.dev/cnn.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
    ],
  },
  {
    type: "symbol",
    label: "Icon/Symbol",
    description: "Graphic symbol without text",
    examples: [
      { name: "Apple", logo: "https://img.logo.dev/apple.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Twitter", logo: "https://img.logo.dev/x.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Target", logo: "https://img.logo.dev/target.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Shell", logo: "https://img.logo.dev/shell.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
    ],
  },
  {
    type: "combination",
    label: "Combination",
    description: "Text combined with a symbol",
    examples: [
      { name: "Adidas", logo: "https://img.logo.dev/adidas.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Burger King", logo: "https://img.logo.dev/bk.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Lacoste", logo: "https://img.logo.dev/lacoste.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Puma", logo: "https://img.logo.dev/puma.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
    ],
  },
  {
    type: "emblem",
    label: "Emblem",
    description: "Text inside a symbol or badge",
    examples: [
      { name: "Starbucks", logo: "https://img.logo.dev/starbucks.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Harley-Davidson", logo: "https://img.logo.dev/harley-davidson.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "BMW", logo: "https://img.logo.dev/bmw.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "NFL", logo: "https://img.logo.dev/nfl.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
    ],
  },
  {
    type: "abstract",
    label: "Abstract",
    description: "Geometric or abstract shapes",
    examples: [
      { name: "Pepsi", logo: "https://img.logo.dev/pepsi.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Nike", logo: "https://img.logo.dev/nike.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "Airbnb", logo: "https://img.logo.dev/airbnb.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
      { name: "BP", logo: "https://img.logo.dev/bp.com?token=pk_VAZ6tvAVQfCjiD0F0zynSw" },
    ],
  },
];

const fontStyles = [
  { name: "Sans Serif", sample: "Clean Modern Professional", fontClass: "font-sans" },
  { name: "Serif", sample: "Elegant Classic Timeless", fontClass: "font-serif" },
  { name: "Script", sample: "Graceful Flowing Creative", fontClass: "italic" },
  { name: "Slab Serif", sample: "Bold Strong Industrial", fontClass: "font-mono font-bold" },
  { name: "Geometric", sample: "Minimal Sharp Precise", fontClass: "font-sans font-light tracking-wider" },
  { name: "Display", sample: "Eye-Catching Headlines", fontClass: "font-bold" },
  { name: "Monospace", sample: "Technical Code Developer", fontClass: "font-mono" },
  { name: "Handwriting", sample: "Personal Friendly Natural", fontClass: "italic font-light" },
];

const Index = () => {
  const { lang, t, switchLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    brandName: "",
    tagline: "",
    description: "",
    targetCustomers: "",
    logoType: "",
    colorPreference: "",
    fontStyle: "",
    additionalNotes: "",
  });
  const [selectedUsage, setSelectedUsage] = useState<string[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usageOptions = [
    { id: "website", label: t.usageOptions.website, icon: <Globe className="w-4 h-4" /> },
    { id: "app", label: t.usageOptions.app, icon: <Smartphone className="w-4 h-4" /> },
    { id: "social", label: t.usageOptions.social, icon: <Share2 className="w-4 h-4" /> },
    { id: "packaging", label: t.usageOptions.packaging, icon: <Package className="w-4 h-4" /> },
    { id: "print", label: t.usageOptions.print, icon: <Printer className="w-4 h-4" /> },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleUsage = (id: string) => {
    setSelectedUsage((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
    if (errors.usage) {
      setErrors((prev) => ({ ...prev, usage: "" }));
    }
  };

  const handleFilesChange = (files: File[]) => {
    setReferenceFiles(files);
    if (errors.referenceFiles && files.length > 0) {
      setErrors((prev) => ({ ...prev, referenceFiles: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.brandName.trim()) {
      newErrors.brandName = t.validation.brandNameRequired;
    }
    if (!formData.description.trim()) {
      newErrors.description = t.validation.descriptionRequired;
    }
    if (!formData.targetCustomers.trim()) {
      newErrors.targetCustomers = t.validation.targetCustomersRequired;
    }
    if (!formData.logoType) {
      newErrors.logoType = t.validation.logoTypeRequired;
    }
    if (!formData.colorPreference.trim()) {
      newErrors.colorPreference = t.validation.colorPreferenceRequired;
    }
    if (!formData.fontStyle) {
      newErrors.fontStyle = t.validation.fontStyleRequired;
    }
    if (referenceFiles.length === 0) {
      newErrors.referenceFiles = t.validation.logoReferenceRequired;
    }
    if (selectedUsage.length === 0) {
      newErrors.usage = t.validation.usageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(lang === "en" ? "Please fill all required fields" : "ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert files to base64
      const filesWithBase64 = await Promise.all(
        referenceFiles.map(async (file) => ({
          name: file.name,
          base64: await fileToBase64(file),
          mimeType: file.type,
        }))
      );

      const { data, error } = await supabase.functions.invoke("submit-questionnaire", {
        body: {
          ...formData,
          selectedUsage,
          referenceFiles: filesWithBase64,
        },
      });

      if (error) throw error;

      toast.success(t.success);
      
      // Reset form
      setFormData({
        brandName: "",
        tagline: "",
        description: "",
        targetCustomers: "",
        logoType: "",
        colorPreference: "",
        fontStyle: "",
        additionalNotes: "",
      });
      setSelectedUsage([]);
      setReferenceFiles([]);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, hsl(0 0% 90%) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(0 0% 90%) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* Header */}
      <header className="relative border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold leading-none">
              <span className="block">Think</span>
              <span className="block">Forge</span>
              <span className="block text-muted-foreground">Global.</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitch currentLang={lang} onSwitch={switchLanguage} />
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground hidden sm:inline">{t.header.available}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t.hero.title} <span className="text-accent">{t.hero.titleAccent}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="relative max-w-3xl mx-auto px-6 pb-8">
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground leading-relaxed">
            {t.intro}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto px-6 pb-16 space-y-6">
        {/* Brand Name */}
        <FormSection
          number={1}
          title={t.form.brandName.title}
          subtitle={t.form.brandName.subtitle}
          required
          error={errors.brandName}
        >
          <Input
            placeholder={t.form.brandName.placeholder}
            value={formData.brandName}
            onChange={(e) => handleInputChange("brandName", e.target.value)}
            className="bg-background"
          />
        </FormSection>

        {/* Tagline */}
        <FormSection
          number={2}
          title={t.form.tagline.title}
          subtitle={t.form.tagline.subtitle}
        >
          <Input
            placeholder={t.form.tagline.placeholder}
            value={formData.tagline}
            onChange={(e) => handleInputChange("tagline", e.target.value)}
            className="bg-background"
          />
        </FormSection>

        {/* Description */}
        <FormSection
          number={3}
          title={t.form.description.title}
          subtitle={t.form.description.subtitle}
          required
          error={errors.description}
        >
          <Textarea
            placeholder={t.form.description.placeholder}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="bg-background min-h-[100px]"
          />
        </FormSection>

        {/* Target Customers */}
        <FormSection
          number={4}
          title={t.form.targetCustomers.title}
          subtitle={t.form.targetCustomers.subtitle}
          required
          error={errors.targetCustomers}
        >
          <Textarea
            placeholder={t.form.targetCustomers.placeholder}
            value={formData.targetCustomers}
            onChange={(e) => handleInputChange("targetCustomers", e.target.value)}
            className="bg-background min-h-[100px]"
          />
        </FormSection>

        {/* Logo Type */}
        <FormSection
          number={5}
          title={t.form.logoType.title}
          subtitle={t.form.logoType.subtitle}
          required
          error={errors.logoType}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {logoTypes.map((logo) => (
              <LogoTypeCard
                key={logo.type}
                type={logo.type}
                label={logo.label}
                malayalamLabel={t.logoTypes[logo.type as keyof typeof t.logoTypes]}
                description={logo.description}
                examples={logo.examples}
                selected={formData.logoType === logo.type}
                onSelect={() => handleInputChange("logoType", logo.type)}
              />
            ))}
          </div>
        </FormSection>

        {/* Color Preference */}
        <FormSection
          number={6}
          title={t.form.colorPreference.title}
          subtitle={t.form.colorPreference.subtitle}
          required
          error={errors.colorPreference}
        >
          <Input
            placeholder={t.form.colorPreference.placeholder}
            value={formData.colorPreference}
            onChange={(e) => handleInputChange("colorPreference", e.target.value)}
            className="bg-background"
          />
        </FormSection>

        {/* Typography */}
        <FormSection
          number={7}
          title={t.form.typography.title}
          required
          error={errors.fontStyle}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fontStyles.map((font) => (
              <FontStyleCard
                key={font.name}
                {...font}
                selected={formData.fontStyle === font.name}
                onSelect={() => handleInputChange("fontStyle", font.name)}
              />
            ))}
          </div>
        </FormSection>

        {/* Logo References */}
        <FormSection
          number={8}
          title={t.form.logoReferences.title}
          subtitle={t.form.logoReferences.subtitle}
          required
          error={errors.referenceFiles}
        >
          <FileUpload files={referenceFiles} onFilesChange={handleFilesChange} />
        </FormSection>

        {/* Usage Applications */}
        <FormSection
          number={9}
          title={t.form.usage.title}
          subtitle={t.form.usage.subtitle}
          required
          error={errors.usage}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usageOptions.map((option) => (
              <UsageCheckbox
                key={option.id}
                label={option.label}
                icon={option.icon}
                checked={selectedUsage.includes(option.id)}
                onChange={() => toggleUsage(option.id)}
              />
            ))}
          </div>
        </FormSection>

        {/* Additional Notes */}
        <FormSection
          number={10}
          title={t.form.additionalNotes.title}
          subtitle={t.form.additionalNotes.subtitle}
        >
          <Textarea
            placeholder={t.form.additionalNotes.placeholder}
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
            className="bg-background min-h-[100px]"
          />
        </FormSection>

        {/* Submit Button */}
        <div className="pt-8">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-medium rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? t.form.submitting : t.form.submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
