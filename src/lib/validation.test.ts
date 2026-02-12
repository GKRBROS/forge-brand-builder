import { describe, it, expect } from "vitest";
import { validateForm } from "./validation";

describe("validateForm", () => {
  const mockT = {
    validation: {
      brandNameRequired: "Brand name required",
      descriptionRequired: "Description required",
      targetCustomersRequired: "Target customers required",
      logoTypeRequired: "Logo type required",
      colorPreferenceRequired: "Color preference required",
      fontStyleRequired: "Font style required",
      logoReferenceRequired: "Logo reference required",
      usageRequired: "Usage required",
    },
  };

  const validFormData = {
    brandName: "Test Brand",
    tagline: "Test Tagline",
    description: "Test Description",
    targetCustomers: "Test Customers",
    logoType: "wordmark",
    colorPreference: "Blue",
    fontStyle: "Sans Serif",
    additionalNotes: "Test Notes",
  };

  const validFiles = [new File([""], "test.png", { type: "image/png" })];
  const validUsage = ["website"];

  it("should return no errors for valid data", () => {
    const errors = validateForm(validFormData, validFiles, validUsage, mockT, "en");
    expect(Object.keys(errors).length).toBe(0);
  });

  it("should return error if brand name is missing", () => {
    const data = { ...validFormData, brandName: "" };
    const errors = validateForm(data, validFiles, validUsage, mockT, "en");
    expect(errors.brandName).toBe(mockT.validation.brandNameRequired);
  });

  it("should return error if description is missing", () => {
    const data = { ...validFormData, description: "" };
    const errors = validateForm(data, validFiles, validUsage, mockT, "en");
    expect(errors.description).toBe(mockT.validation.descriptionRequired);
  });

  it("should return error if additional notes are missing", () => {
    const data = { ...validFormData, additionalNotes: "" };
    const errors = validateForm(data, validFiles, validUsage, mockT, "en");
    expect(errors.additionalNotes).toBe("Additional notes are required");
  });

  it("should return error if files are missing", () => {
    const errors = validateForm(validFormData, [], validUsage, mockT, "en");
    expect(errors.referenceFiles).toBe(mockT.validation.logoReferenceRequired);
  });

  it("should return error if usage is missing", () => {
    const errors = validateForm(validFormData, validFiles, [], mockT, "en");
    expect(errors.usage).toBe(mockT.validation.usageRequired);
  });

  it("should NOT return error if tagline is missing", () => {
    const data = { ...validFormData, tagline: "" };
    const errors = validateForm(data, validFiles, validUsage, mockT, "en");
    expect(errors.brandName).toBeUndefined();
    expect(Object.keys(errors).length).toBe(0);
  });
});
