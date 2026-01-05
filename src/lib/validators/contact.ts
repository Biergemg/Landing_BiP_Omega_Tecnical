import { z } from 'zod';

// Constantes de validación para seguridad y performance
const MAX_NAME_LENGTH = 100;
const MAX_ORGANIZATION_LENGTH = 150;
const MAX_ROLE_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 1000;

export const ContactFormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(MAX_NAME_LENGTH, `Name must not exceed ${MAX_NAME_LENGTH} characters`)
        .regex(/^[a-zA-ZÀ-ÿà-ÿ\s'-]+$/, 'Name contains invalid characters (only letters, spaces, hyphens and apostrophes allowed)'),
    email: z.string().email("Invalid email address"),
    organization: z.string()
        .min(2, "Organization must be at least 2 characters")
        .max(MAX_ORGANIZATION_LENGTH, `Organization must not exceed ${MAX_ORGANIZATION_LENGTH} characters`)
        .regex(/^[a-zA-Z0-9\s\-.,&'()]+$/, 'Organization contains invalid characters'),
    role: z.string()
        .max(MAX_ROLE_LENGTH, `Role must not exceed ${MAX_ROLE_LENGTH} characters`)
        .optional(),
    stage: z.enum(["pre-fe", "fe", "dev", "construction", "operation"]).optional(),
    message: z.string()
        .min(10, "Message must be at least 10 characters")
        .max(MAX_MESSAGE_LENGTH, `Message must not exceed ${MAX_MESSAGE_LENGTH} characters`)
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
