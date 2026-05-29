import { z } from "zod";

// Auth validators
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: z.enum(["superadmin", "admin", "editor"]).optional(),
});

// Director validators
export const directorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  position: z.string().min(2, "Position must be at least 2 characters").max(200),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(1000),
  imageUrl: z.string().min(1, "Image is required"),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  linkedinUrl: z.string().url().or(z.literal("")).optional(),
  twitterUrl: z.string().url().or(z.literal("")).optional(),
});

// Event validators
export const eventSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(5000),
  imageUrl: z.string().optional(),
  date: z.string().transform((val) => new Date(val)),
  location: z.string().max(200).optional(),
  category: z.enum(["corporate", "csr", "awards", "partnership", "other"]).default("corporate"),
  isActive: z.boolean().default(true),
});

// Vacancy validators
export const vacancySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(10000),
  location: z.string().min(2, "Location is required").max(200),
  type: z.enum(["full-time", "part-time", "contract", "internship"]).default("full-time"),
  department: z.string().max(100).default("General"),
  requirements: z.array(z.string().max(500)).default([]),
  responsibilities: z.array(z.string().max(500)).default([]),
  salaryRange: z.string().max(100).optional(),
  expiryDate: z.string().transform((val) => new Date(val)),
  isUrgent: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

// Application validators
export const applicationSchema = z.object({
  vacancyId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid vacancy ID"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required").max(20),
  coverLetter: z.string().max(5000).optional(),
  country: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  yearsOfExperience: z.number().min(0).optional(),
  lastCompanyWorked: z.string().max(200).optional(),
  expectedSalary: z.string().max(100).optional(),
});

// Inquiry validators
export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional(),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  category: z.enum(["general", "partnership", "careers", "products", "complaint"]).default("general"),
});

// Settings validators
export const settingsSchema = z.object({
  siteName: z.string().max(200).optional(),
  tagline: z.string().max(300).optional(),
  description: z.string().max(1000).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().or(z.literal("")).optional(),
  twitterUrl: z.string().max(500).optional(),
  facebookUrl: z.string().max(500).optional(),
  instagramUrl: z.string().max(500).optional(),
  linkedinUrl: z.string().max(500).optional(),
  youtubeUrl: z.string().max(500).optional(),
  heroTitle: z.string().max(500).optional(),
  heroSubtitle: z.string().max(500).optional(),
  maintenanceMode: z.boolean().optional(),
});

// Helper to validate with Zod
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod v4 uses .issues, v3 uses .errors
      const issues = (error as { issues?: Array<{ path: (string | number)[]; message: string }> }).issues || (error as { errors?: Array<{ path: (string | number)[]; message: string }> }).errors || [];
      const errors = issues.map((err) => `${err.path.join(".")}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ["Validation failed"] };
  }
}
