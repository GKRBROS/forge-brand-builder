export type Language = "en" | "ml";

export const translations = {
  en: {
    header: {
      available: "Available for New Projects",
    },
    hero: {
      title: "Logo Design",
      titleAccent: "Questionnaire",
      subtitle: "Help us understand your brand to create the perfect logo",
    },
    intro: "This form will help us understand your brand better and create the perfect logo on the first try. Clear answers will make the design process smoother and avoid unnecessary revisions.",
    form: {
      brandName: {
        title: "Your Brand / Company Name",
        subtitle: 'Example: "Fresh Bakes Bakery" or "Tech Solutions India"',
        placeholder: "Enter your brand name",
      },
      tagline: {
        title: "Tagline (Optional)",
        subtitle: 'Example: "Baked with Love" or "Innovate. Transform. Succeed."',
        placeholder: "Enter your tagline (optional)",
      },
      description: {
        title: "Describe your brand in 1-2 sentences",
        subtitle: 'Example: "We are a boutique bakery specializing in custom cakes and artisan breads using organic ingredients."',
        placeholder: "Describe your brand in 1-2 sentences",
      },
      targetCustomers: {
        title: "Who are your main customers?",
        subtitle: 'Example: "Young professionals aged 25-40 in urban areas who value premium quality and convenience."',
        placeholder: "Describe your target customers",
      },
      logoType: {
        title: "What type of logo do you want?",
        subtitle: "Select the logo style that best fits your brand (hover over examples)",
      },
      colorPreference: {
        title: "Do you have preferred colors for the logo?",
        subtitle: 'Example: "Blue and white for trust" or "Green for eco-friendly" or "No preference"',
        placeholder: "Enter your color preferences",
      },
      typography: {
        title: "Typography Preference - What font style do you prefer?",
      },
      logoReferences: {
        title: "Logo References",
        subtitle: "Please upload any logos you like as samples (required)",
      },
      usage: {
        title: "Logo Usage / Applications",
        subtitle: "Where will the logo be used? (Select multiple)",
      },
      additionalNotes: {
        title: "Additional Notes",
        subtitle: "Any other details or preferences we should consider before starting the design?",
        placeholder: "Any additional details or preferences...",
      },
      submit: "Submit Questionnaire",
      submitting: "Submitting...",
    },
    validation: {
      brandNameRequired: "Brand name is required",
      descriptionRequired: "Brand description is required",
      targetCustomersRequired: "Target customers is required",
      logoTypeRequired: "Please select a logo type",
      colorPreferenceRequired: "Color preference is required",
      fontStyleRequired: "Please select a font style",
      logoReferenceRequired: "Please upload at least one logo reference",
      usageRequired: "Please select at least one usage option",
    },
    logoTypes: {
      wordmark: "Text only",
      lettermark: "Initials",
      symbol: "Symbol only",
      combination: "Text + Symbol",
      emblem: "Badge/Seal",
      abstract: "Abstract shapes",
    },
    usageOptions: {
      website: "Website",
      app: "App Icon",
      social: "Social Media",
      packaging: "Packaging",
      print: "Print Materials",
    },
    success: "Form submitted successfully!",
    error: "Something went wrong. Please try again.",
  },
  ml: {
    header: {
      available: "പുതിയ പ്രോജക്ടുകൾക്ക് ലഭ്യമാണ്",
    },
    hero: {
      title: "ലോഗോ ഡിസൈൻ",
      titleAccent: "ചോദ്യാവലി",
      subtitle: "മികച്ച ലോഗോ സൃഷ്ടിക്കാൻ നിങ്ങളുടെ ബ്രാൻഡിനെ മനസ്സിലാക്കാൻ ഞങ്ങളെ സഹായിക്കൂ",
    },
    intro: "ഈ ഫോം നിങ്ങളുടെ ബ്രാൻഡിനെ നന്നായി മനസ്സിലാക്കാനും ആദ്യ ശ്രമത്തിൽ തന്നെ മികച്ച ലോഗോ സൃഷ്ടിക്കാനും ഞങ്ങളെ സഹായിക്കും. വ്യക്തമായ ഉത്തരങ്ങൾ നൽകിയാൽ ഡിസൈൻ പ്രക്രിയ സുഗമമാകുകയും അനാവശ്യ മാറ്റങ്ങൾ ഒഴിവാക്കാനും സാധിക്കും.",
    form: {
      brandName: {
        title: "നിങ്ങളുടെ ബ്രാൻഡ് / കമ്പനിയുടെ പേര്",
        subtitle: 'ഉദാഹരണം: "Fresh Bakes Bakery" അല്ലെങ്കിൽ "Tech Solutions India"',
        placeholder: "നിങ്ങളുടെ ബ്രാൻഡ് പേര് നൽകുക",
      },
      tagline: {
        title: "ടാഗ്‌ലൈൻ (Optional)",
        subtitle: 'ഉദാഹരണം: "Baked with Love" അല്ലെങ്കിൽ "Innovate. Transform. Succeed."',
        placeholder: "നിങ്ങളുടെ ടാഗ്‌ലൈൻ നൽകുക (ഐച്ഛികം)",
      },
      description: {
        title: "നിങ്ങളുടെ ബ്രാൻഡിനെ കുറിച്ച് 1–2 വാക്യങ്ങളിൽ വിവരിക്കുക.",
        subtitle: 'ഉദാഹരണം: "ഓർഗാനിക് ചേരുവകൾ ഉപയോഗിച്ച് ഇഷ്ടാനുസൃത കേക്കുകളും ആർട്ടിസൻ ബ്രെഡുകളും നിർമ്മിക്കുന്ന ബൂട്ടിക് ബേക്കറിയാണ് ഞങ്ങൾ."',
        placeholder: "നിങ്ങളുടെ ബ്രാൻഡിനെ 1-2 വാക്യങ്ങളിൽ വിവരിക്കുക",
      },
      targetCustomers: {
        title: "നിങ്ങളുടെ പ്രധാന Customers ആരൊക്കെയാണ്?",
        subtitle: 'ഉദാഹരണം: "പ്രീമിയം ഗുണനിലവാരവും സൗകര്യവും വിലമതിക്കുന്ന നഗരപ്രദേശങ്ങളിലെ 25-40 വയസ്സുള്ള യുവ പ്രൊഫഷണലുകൾ."',
        placeholder: "നിങ്ങളുടെ ടാർഗെറ്റ് ഉപഭോക്താക്കളെ വിവരിക്കുക",
      },
      logoType: {
        title: "ഏത് തരം ലോഗോയാണ് നിങ്ങൾ ആഗ്രഹിക്കുന്നത്? (ചിത്രങ്ങൾ കാണുക)",
        subtitle: "നിങ്ങളുടെ ബ്രാൻഡിന് ഏറ്റവും അനുയോജ്യമായ ലോഗോ ശൈലി തിരഞ്ഞെടുക്കുക (ഉദാഹരണങ്ങൾ കാണാൻ ഹോവർ ചെയ്യുക)",
      },
      colorPreference: {
        title: "ലോഗോയ്ക്ക് ഇഷ്ടമുള്ള നിറങ്ങൾ ഉണ്ടോ?",
        subtitle: 'ഉദാഹരണം: "വിശ്വാസത്തിന് നീലയും വെളുപ്പും" അല്ലെങ്കിൽ "പരിസ്ഥിതി സൗഹൃദത്തിന് പച്ച" അല്ലെങ്കിൽ "മുൻഗണനയില്ല"',
        placeholder: "നിങ്ങളുടെ നിറ മുൻഗണനകൾ നൽകുക",
      },
      typography: {
        title: "Typography preference(നിങ്ങൾ ഇഷ്ടപ്പെടുന്ന Font  ശൈലി എന്താണ്?",
      },
      logoReferences: {
        title: "Logo References : നിങ്ങൾക്ക് ഇഷ്ടമായ ലോഗോകൾ ഉണ്ടെങ്കിൽ, ദയവായി അവ സാമ്പിൾ ആയി ഇവിടെ അപ്‌ലോഡ് ചെയ്യുക. ഒന്നിൽ കൂടുതൽ ഉണ്ടെങ്കിൽ എല്ലാം അപ്‌ലോഡ് ചെയ്യാവുന്നതാണ്.",
        subtitle: "നിങ്ങൾക്ക് ഇഷ്ടമായ ലോഗോകൾ സാമ്പിൾ ആയി അപ്‌ലോഡ് ചെയ്യുക (ഐച്ഛികം)",
      },
      usage: {
        title: "Logo Usage / Applications : ലോഗോ എവിടെയൊക്കെ ഉപയോഗിക്കും? (ഉദാ: വെബ്‌സൈറ്റ്, സോഷ്യൽ മീഡിയ, പ്രിന്റ്, പാക്കേജിംഗ്)",
        subtitle: "ലോഗോ എവിടെയൊക്കെ ഉപയോഗിക്കും? (ഒന്നിൽ കൂടുതൽ select ചെയ്യാം)",
      },
      additionalNotes: {
        title: "ഡിസൈൻ ആരംഭിക്കുന്നതിന് മുമ്പ്  ഞങ്ങൾ പരിഗണിക്കേണ്ട മറ്റേതെങ്കിലും വിശദാംശങ്ങളോ മുൻഗണനകളോ ഉണ്ടോ?",
        subtitle: "ഡിസൈൻ ആരംഭിക്കുന്നതിന് മുമ്പ് ഞങ്ങൾ പരിഗണിക്കേണ്ട മറ്റേതെങ്കിലും വിശദാംശങ്ങളോ മുൻഗണനകളോ ഉണ്ടോ?",
        placeholder: "അധിക വിശദാംശങ്ങളോ മുൻഗണനകളോ...",
      },
      submit: "ചോദ്യാവലി സമർപ്പിക്കുക",
      submitting: "സമർപ്പിക്കുന്നു...",
    },
    validation: {
      brandNameRequired: "ബ്രാൻഡ് പേര് ആവശ്യമാണ്",
      descriptionRequired: "ബ്രാൻഡ് വിവരണം ആവശ്യമാണ്",
      targetCustomersRequired: "ടാർഗെറ്റ് ഉപഭോക്താക്കൾ ആവശ്യമാണ്",
      logoTypeRequired: "ദയവായി ഒരു ലോഗോ തരം തിരഞ്ഞെടുക്കുക",
      colorPreferenceRequired: "നിറ മുൻഗണന ആവശ്യമാണ്",
      fontStyleRequired: "ദയവായി ഒരു ഫോണ്ട് ശൈലി തിരഞ്ഞെടുക്കുക",
      logoReferenceRequired: "കുറഞ്ഞത് ഒരു ലോഗോ റഫറൻസ് അപ്‌ലോഡ് ചെയ്യുക",
      usageRequired: "കുറഞ്ഞത് ഒരു ഉപയോഗ ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക",
    },
    logoTypes: {
      wordmark: "വാക്കുകൾ മാത്രം",
      lettermark: "ചുരുക്കെഴുത്ത്",
      symbol: "ചിഹ്നം മാത്രം",
      combination: "വാക്കും ചിഹ്നവും",
      emblem: "മുദ്ര",
      abstract: "അമൂർത്ത രൂപങ്ങൾ",
    },
    usageOptions: {
      website: "വെബ്‌സൈറ്റ്",
      app: "ആപ്പ് ഐക്കൺ",
      social: "സോഷ്യൽ മീഡിയ",
      packaging: "പാക്കേജിംഗ്",
      print: "പ്രിന്റ് മെറ്റീരിയൽസ്",
    },
    success: "ഫോം വിജയകരമായി സമർപ്പിച്ചു!",
    error: "എന്തോ തെറ്റ് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.",
  },
};

export type Translations = typeof translations.en;
