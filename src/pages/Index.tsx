import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/questionnaire/FormSection";
import LogoTypeCard from "@/components/questionnaire/LogoTypeCard";
import FontStyleCard from "@/components/questionnaire/FontStyleCard";
import UsageCheckbox from "@/components/questionnaire/UsageCheckbox";
import FileUpload from "@/components/questionnaire/FileUpload";
import { Globe, Smartphone, Share2, Package, Printer } from "lucide-react";

const logoTypes = [
  {
    type: "wordmark",
    label: "Wordmark",
    malayalamLabel: "വാക്കുകൾ മാത്രം",
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
    malayalamLabel: "ചുരുക്കെഴുത്ത്",
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
    malayalamLabel: "ചിഹ്നം മാത്രം",
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
    malayalamLabel: "വാക്കും ചിഹ്നവും",
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
    malayalamLabel: "മുദ്ര",
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
    malayalamLabel: "",
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

const usageOptions = [
  { id: "website", label: "Website", icon: <Globe className="w-4 h-4" /> },
  { id: "app", label: "App Icon", icon: <Smartphone className="w-4 h-4" /> },
  { id: "social", label: "Social Media", icon: <Share2 className="w-4 h-4" /> },
  { id: "packaging", label: "Packaging", icon: <Package className="w-4 h-4" /> },
  { id: "print", label: "Print Materials", icon: <Printer className="w-4 h-4" /> },
];

const Index = () => {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleUsage = (id: string) => {
    setSelectedUsage((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
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
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">Available for New Projects</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Logo Design <span className="text-accent">Questionnaire</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Help us understand your brand to create the perfect logo
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="relative max-w-3xl mx-auto px-6 pb-8">
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground leading-relaxed">
            ഈ ഫോം നിങ്ങളുടെ ബ്രാൻഡിനെ നന്നായി മനസ്സിലാക്കാനും ആദ്യ ശ്രമത്തിൽ തന്നെ മികച്ച ലോഗോ 
            സൃഷ്ടിക്കാനും ഞങ്ങളെ സഹായിക്കും. വ്യക്തമായ ഉത്തരങ്ങൾ നൽകിയാൽ ഡിസൈൻ പ്രക്രിയ 
            സുഗമമാകുകയും അനാവശ്യ മാറ്റങ്ങൾ ഒഴിവാക്കാനും സാധിക്കും.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="relative max-w-3xl mx-auto px-6 pb-16 space-y-6">
        {/* Brand Name */}
        <FormSection
          number={1}
          title="നിങ്ങളുടെ ബ്രാൻഡ് / കമ്പനിയുടെ പേര്"
          subtitle='Example: "Fresh Bakes Bakery" or "Tech Solutions India"'
          required
        >
          <Input
            placeholder="Enter your brand name"
            value={formData.brandName}
            onChange={(e) => handleInputChange("brandName", e.target.value)}
            className="bg-background"
          />
        </FormSection>

        {/* Tagline */}
        <FormSection
          number={2}
          title="ടാഗ്‌ലൈൻ (Optional)"
          subtitle='Example: "Baked with Love" or "Innovate. Transform. Succeed."'
        >
          <Input
            placeholder="Enter your tagline (optional)"
            value={formData.tagline}
            onChange={(e) => handleInputChange("tagline", e.target.value)}
            className="bg-background"
          />
        </FormSection>

        {/* Description */}
        <FormSection
          number={3}
          title="നിങ്ങളുടെ ബ്രാൻഡിനെ കുറിച്ച് 1–2 വാക്യങ്ങളിൽ വിവരിക്കുക"
          subtitle='Example: "We are a boutique bakery specializing in custom cakes and artisan breads using organic ingredients."'
          required
        >
          <Textarea
            placeholder="Describe your brand in 1-2 sentences"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="bg-background min-h-[100px]"
          />
        </FormSection>

        {/* Target Customers */}
        <FormSection
          number={4}
          title="നിങ്ങളുടെ പ്രധാന Customers ആരൊക്കെയാണ്?"
          subtitle='Example: "Young professionals aged 25-40 in urban areas who value premium quality and convenience."'
          required
        >
          <Textarea
            placeholder="Describe your target customers"
            value={formData.targetCustomers}
            onChange={(e) => handleInputChange("targetCustomers", e.target.value)}
            className="bg-background min-h-[100px]"
          />
        </FormSection>

        {/* Logo Type */}
        <FormSection
          number={5}
          title="ഏത് തരം ലോഗോയാണ് നിങ്ങൾ ആഗ്രഹിക്കുന്നത്?"
          subtitle="Select the logo style that best fits your brand (hover over examples)"
          required
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {logoTypes.map((logo) => (
              <LogoTypeCard
                key={logo.type}
                {...logo}
                selected={formData.logoType === logo.type}
                onSelect={() => handleInputChange("logoType", logo.type)}
              />
            ))}
          </div>
        </FormSection>

        {/* Color Preference */}
        <FormSection
          number={6}
          title="ലോഗോയ്ക്ക് ഇഷ്ടമുള്ള നിറങ്ങൾ ഉണ്ടോ?"
          subtitle='Example: "Blue and white for trust" or "Green for eco-friendly" or "No preference"'
          required
        >
          <Input
            placeholder="Enter your color preferences"
            value={formData.colorPreference}
            onChange={(e) => handleInputChange("colorPreference", e.target.value)}
            className="bg-background"
          />
        </FormSection>

        {/* Typography */}
        <FormSection
          number={7}
          title="Typography Preference - നിങ്ങൾ ഇഷ്ടപ്പെടുന്ന Font ശൈലി എന്താണ്?"
          required
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
          title="Logo References"
          subtitle="നിങ്ങൾക്ക് ഇഷ്ടമായ ലോഗോകൾ ഉണ്ടെങ്കിൽ, ദയവായി അവ സാമ്പിൾ ആയി ഇവിടെ അപ്‌ലോഡ് ചെയ്യുക"
        >
          <FileUpload files={referenceFiles} onFilesChange={setReferenceFiles} />
        </FormSection>

        {/* Usage Applications */}
        <FormSection
          number={9}
          title="Logo Usage / Applications"
          subtitle="ലോഗോ എവിടെയൊക്കെ ഉപയോഗിക്കും? (ഒന്നിൽ കൂടുതൽ select ചെയ്യാം)"
          required
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
          title="Additional Notes"
          subtitle="ഡിസൈൻ ആരംഭിക്കുന്നതിന് മുമ്പ് ഞങ്ങൾ പരിഗണിക്കേണ്ട മറ്റേതെങ്കിലും വിശദാംശങ്ങളോ മുൻഗണനകളോ ഉണ്ടോ?"
        >
          <Textarea
            placeholder="Any additional details or preferences..."
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
            className="w-full py-6 text-lg font-medium rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Submit Questionnaire
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
