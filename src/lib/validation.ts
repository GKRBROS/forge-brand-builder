export interface FormData {
  brandName: string;
  tagline: string;
  description: string;
  targetCustomers: string;
  logoType: string;
  colorPreference: string;
  fontStyle: string;
  additionalNotes: string;
}

export interface ValidationErrors {
  brandName?: string;
  description?: string;
  targetCustomers?: string;
  logoType?: string;
  colorPreference?: string;
  fontStyle?: string;
  additionalNotes?: string;
  referenceFiles?: string;
  usage?: string;
}

export const validateForm = (
  formData: FormData,
  referenceFiles: File[],
  selectedUsage: string[],
  t: any,
  lang: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.brandName.trim()) {
    errors.brandName = t.validation.brandNameRequired;
  }
  if (!formData.description.trim()) {
    errors.description = t.validation.descriptionRequired;
  }
  if (!formData.targetCustomers.trim()) {
    errors.targetCustomers = t.validation.targetCustomersRequired;
  }
  if (!formData.logoType) {
    errors.logoType = t.validation.logoTypeRequired;
  }
  if (!formData.colorPreference.trim()) {
    errors.colorPreference = t.validation.colorPreferenceRequired;
  }
  if (!formData.fontStyle) {
    errors.fontStyle = t.validation.fontStyleRequired;
  }
  if (referenceFiles.length === 0) {
    errors.referenceFiles = t.validation.logoReferenceRequired;
  }
  if (selectedUsage.length === 0) {
    errors.usage = t.validation.usageRequired;
  }

  return errors;
};
