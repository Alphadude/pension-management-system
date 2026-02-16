import { serviceCategory } from "@/lib/service-category";
import { boolean, mixed, object, ref, string } from "yup";

// Step 1 Validation Schema
export const step1Schema = object({
  reoccuring: string().required("Vendor type is required"),
});

// Step 2 Validation Schema
export const step2Schema = object({
  businessType: string()
    .oneOf(["Business/Enterprise", "Individual"], "Business Type is required")
    .required("Business Type is required"),
  companyName: string().when("reoccuring", {
    is: (val: string) => val === "false",
    then: (schema) => schema.required("Company Name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  serviceCategory: string()
    .oneOf(serviceCategory, "Service Category is required")
    .required("Service Category is required"),
  contactPerson: string().required("Contact Person is required"),
  email: string()
    .trim()
    .email("Email address is incorrect")
    .required("Email address is required"),
  phoneNumber: string().trim().required("Phone number is required"),
  password: string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: string()
    .trim()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  businessAddress: string().required("Business Address is required"),
});

// Step 3 Validation Schema
export const step3Schema = object({
  cacRegistration: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "false",
      then: (schema) =>
        schema
          .required("CAC Registration Certificate is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  taxIdentificationNumer: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "false",
      then: (schema) =>
        schema
          .required("Tax Identification Number certificate is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  industryCertifications: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "false",
      then: (schema) =>
        schema
          .required("Industry Certifications is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  workPortfolio: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "false",
      then: (schema) =>
        schema
          .required("Work Portfolio is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  referenceLetters: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "false",
      then: (schema) =>
        schema
          .required("Reference Letters is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  validGovernmentId: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "true",
      then: (schema) =>
        schema
          .required("Valid Government ID is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  utilityBills: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "true",
      then: (schema) =>
        schema
          .required("Proof of Address is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
  passportPhotograph: mixed()
    .nullable()
    .when("reoccuring", {
      is: (val: string) => val === "true",
      then: (schema) =>
        schema
          .required("Passport Photograph is required")
          .test(
            "fileSize",
            "File size must be less than 3MB",
            (value) =>
              !value ||
              (value instanceof File && value.size <= 3 * 1024 * 1024),
          ),
      otherwise: (schema) => schema.optional(),
    }),
});

// Step 4 Validation Schema
export const step4Schema = object({
  terms: boolean().oneOf([true], "You must agree to terms"),
});
