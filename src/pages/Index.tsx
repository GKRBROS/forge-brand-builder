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
      { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
      { name: "Coca-Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png" },
      { name: "FedEx", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/FedEx_Corporation_-_2016_Logo.svg/200px-FedEx_Corporation_-_2016_Logo.svg.png" },
      { name: "Disney", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/200px-Disney%2B_logo.svg.png" },
      { name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Canon_wordmark.svg/200px-Canon_wordmark.svg.png" },
    ],
  },
  {
    type: "lettermark",
    label: "Lettermark",
    malayalamLabel: "ചുരുക്കെഴുത്ത്",
    description: "Initials or abbreviations",
    examples: [
      { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png" },
      { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/150px-HP_logo_2012.svg.png" },
      { name: "HBO", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/150px-HBO_logo.svg.png" },
      { name: "CNN", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/150px-CNN.svg.png" },
      { name: "NASA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/150px-NASA_logo.svg.png" },
    ],
  },
  {
    type: "symbol",
    label: "Icon/Symbol",
    malayalamLabel: "ചിഹ്നം മാത്രം",
    description: "Graphic symbol without text",
    examples: [
      { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png" },
      { name: "Twitter", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/100px-Logo_of_Twitter.svg.png" },
      { name: "Target", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/100px-Target_logo.svg.png" },
      { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Shell_logo.svg/100px-Shell_logo.svg.png" },
      { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/100px-Spotify_icon.svg.png" },
    ],
  },
  {
    type: "combination",
    label: "Combination",
    malayalamLabel: "വാക്കും ചിഹ്നവും",
    description: "Text combined with a symbol",
    examples: [
      { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/200px-Adidas_Logo.svg.png" },
      { name: "Burger King", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/150px-Burger_King_logo_%281999%29.svg.png" },
      { name: "Lacoste", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lacoste_logo.svg/150px-Lacoste_logo.svg.png" },
      { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_logo.svg/200px-Puma_logo.svg.png" },
      { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png" },
    ],
  },
  {
    type: "emblem",
    label: "Emblem",
    malayalamLabel: "മുദ്ര",
    description: "Text inside a symbol or badge",
    examples: [
      { name: "Starbucks", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/150px-Starbucks_Corporation_Logo_2011.svg.png" },
      { name: "Harley-Davidson", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Harley-Davidson_logo.svg/200px-Harley-Davidson_logo.svg.png" },
      { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png" },
      { name: "NFL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/100px-National_Football_League_logo.svg.png" },
      { name: "Warner Bros", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/150px-Warner_Bros_logo.svg.png" },
    ],
  },
  {
    type: "abstract",
    label: "Abstract",
    malayalamLabel: "",
    description: "Geometric or abstract shapes",
    examples: [
      { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/150px-Pepsi_logo_2014.svg.png" },
      { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png" },
      { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/150px-Airbnb_Logo_B%C3%A9lo.svg.png" },
      { name: "BP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/BP_logo.svg/100px-BP_logo.svg.png" },
      { name: "Chase", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Chase_logo_2007.svg/100px-Chase_logo_2007.svg.png" },
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
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Think Forge Global</h1>
          <p className="text-lg opacity-90">Logo Design Questionnaire</p>
        </div>
      </header>

      {/* Introduction */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-accent/30 rounded-xl p-5 border border-border">
          <p className="text-muted-foreground text-sm leading-relaxed">
            ഈ ഫോം നിങ്ങളുടെ ബ്രാൻഡിനെ നന്നായി മനസ്സിലാക്കാനും ആദ്യ ശ്രമത്തിൽ തന്നെ മികച്ച ലോഗോ 
            സൃഷ്ടിക്കാനും ഞങ്ങളെ സഹായിക്കും. വ്യക്തമായ ഉത്തരങ്ങൾ നൽകിയാൽ ഡിസൈൻ പ്രക്രിയ 
            സുഗമമാകുകയും അനാവശ്യ മാറ്റങ്ങൾ ഒഴിവാക്കാനും സാധിക്കും.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="max-w-3xl mx-auto px-4 pb-12 space-y-6">
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
        <div className="pt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full py-6 text-lg font-semibold"
          >
            Submit Questionnaire
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
