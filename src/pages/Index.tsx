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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const logoTypes = [
  {
    type: "wordmark",
    label: "Wordmark",
    description: "Text-based logo using the brand name",
    image: "/types/word.png",
  },
  {
    type: "lettermark",
    label: "Lettermark",
    description: "Initials or abbreviations",
    image: "/types/letter.png",
  },
  {
    type: "symbol",
    label: "Icon/Symbol",
    description: "Graphic symbol without text",
    image: "/types/pic.png",
  },
  {
    type: "combination",
    label: "Combination",
    description: "Text combined with a symbol",
    image: "/types/combi.png",
  },
  {
    type: "emblem",
    label: "Emblem",
    description: "Text inside a symbol or badge",
    image: "/types/emblem.png",
  },
  {
    type: "abstract",
    label: "Abstract",
    description: "Geometric or abstract shapes",
    image: "/types/abstract.png",
  },
];

const fontStyles = [
  {
    name: "Sans Serif",
    sample: "Clean Modern Professional",
    fontClass: "font-sans",
    image: "/font/sans.png",
  },
  {
    name: "Serif",
    sample: "Elegant Classic Timeless",
    fontClass: "font-serif",
    image: "/font/serif.png",
  },
  {
    name: "Script",
    sample: "Graceful Flowing Creative",
    fontClass: "italic",
    image: "/font/script.png",
  },
  {
    name: "Slab Serif",
    sample: "Bold Strong Industrial",
    fontClass: "font-mono font-bold",
    image: "/font/slab.png",
  },
  {
    name: "Geometric",
    sample: "Minimal Sharp Precise",
    fontClass: "font-sans font-light tracking-wider",
    image: "/font/geometric.png",
  },
  {
    name: "Display",
    sample: "Eye-Catching Headlines",
    fontClass: "font-bold",
    image: "/font/display.png",
  },
  {
    name: "Monospace",
    sample: "Technical Code Developer",
    fontClass: "font-mono",
    image: "/font/monspace.png",
  },
  {
    name: "Handwriting",
    sample: "Personal Friendly Natural",
    fontClass: "italic font-light",
    image: "/font/handwriting.png",
  },
  {
    name: "Didone",
    sample: "High contrast modern",
    fontClass: "font-serif",
    image: "/font/didone.png",
  },
  {
    name: "Blackletter",
    sample: "Old style dramatic",
    fontClass: "font-serif",
    image: "/font/blackletter.png",
  },
  {
    name: "Glyph",
    sample: "Decorative glyph style",
    fontClass: "font-serif",
    image: "/font/glyph.png",
  },
  {
    name: "No Preference (Designer’s choice)",
    sample: "",
    fontClass: "",
    blank: true,
  },
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
    {
      id: "website",
      label: t.usageOptions.website,
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: "app",
      label: t.usageOptions.app,
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: "social",
      label: t.usageOptions.social,
      icon: <Share2 className="w-4 h-4" />,
    },
    {
      id: "packaging",
      label: t.usageOptions.packaging,
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "print",
      label: t.usageOptions.print,
      icon: <Printer className="w-4 h-4" />,
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleUsage = (id: string) => {
    setSelectedUsage((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
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
      toast.error(
        lang === "en"
          ? "Please fill all required fields"
          : "ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
      );
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
        })),
      );

      const { data, error } = await supabase.functions.invoke(
        "submit-questionnaire",
        {
          body: {
            ...formData,
            selectedUsage,
            referenceFiles: filesWithBase64,
          },
        },
      );

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to submit form");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

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
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
          linear-gradient(to right, hsl(0 0% 95%) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(0 0% 95%) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16 flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Left column (hero / language) */}
        <div className="md:w-5/12 flex flex-col gap-6 md:sticky md:top-10 md:self-start">
          <div className="flex justify-start w-full">
            <img
              src="/brand/thinkforge-logo.svg"
              alt="Think Forge Global"
              className="h-20 w-20"
            />
          </div>

          <div className="space-y-4">
            <h1
              className={`font-normal max-w-full ${lang === "ml" ? "keraleeyam-regular" : "cal-sans-regular"} text-left`}
              style={{
                fontSize: lang === "ml" ? "clamp(28px, 6vw, 96px)" : "clamp(32px, 8vw, 96px)",
                lineHeight: lang === "ml" ? "clamp(24px, 5.5vw, 80px)" : "clamp(32px, 7.5vw, 88px)",
                letterSpacing: "0px",
                opacity: 1,
              }}
            >
              {t.hero.title}
              <br />
              {t.hero.titleAccent}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-geist text-center">
              {t.intro}
            </p>
          </div>

          <div className="flex justify-center w-full">
            <LanguageSwitch currentLang={lang} onSwitch={switchLanguage} />
          </div>
        </div>

        {/* Right column (form) */}
        <form
          onSubmit={handleSubmit}
          className="md:w-7/12 flex-1 pb-16 space-y-6"
        >
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
              onChange={(e) =>
                handleInputChange("targetCustomers", e.target.value)
              }
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
            <div className="grid grid-cols-1 gap-4">
              {logoTypes.map((logo) => (
                <LogoTypeCard
                  key={logo.type}
                  type={logo.type}
                  label={logo.label}
                  malayalamLabel={
                    t.logoTypes[logo.type as keyof typeof t.logoTypes]
                  }
                  description={logo.description}
                  image={logo.image}
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
              onChange={(e) =>
                handleInputChange("colorPreference", e.target.value)
              }
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
            <div className="grid grid-cols-1 gap-4">
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
            error={errors.referenceFiles}
          >
            <FileUpload
              files={referenceFiles}
              onFilesChange={handleFilesChange}
            />
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
              onChange={(e) =>
                handleInputChange("additionalNotes", e.target.value)
              }
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
    </div>
  );
};

export default Index;
