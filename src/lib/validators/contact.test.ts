import { describe, it, expect } from 'vitest';
import { ContactFormSchema } from './contact';

describe('ContactFormSchema', () => {
    it('validates a correct form object', () => {
        const validData = {
            name: 'Gustavo Bierge',
            email: 'gustavo@bipomega.com',
            organization: 'BiP Omega',
            message: 'This is a valid inquiry about BESS risk assessment.'
        };

        const result = ContactFormSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
        const invalidData = {
            name: 'Gustavo',
            email: 'not-an-email',
            organization: 'BiP Omega',
            message: 'Hello'
        };

        const result = ContactFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('email');
        }
    });

    it('requires minimum message length', () => {
        const shortMessage = {
            name: 'Gustavo',
            email: 'valid@email.com',
            organization: 'BiP Omega',
            message: 'Short'
        };

        const result = ContactFormSchema.safeParse(shortMessage);
        expect(result.success).toBe(false);
    });

    it('rejects names with invalid characters', () => {
        const invalidName = {
            name: 'Gustavo123!@#',
            email: 'valid@email.com',
            organization: 'BiP Omega',
            message: 'This is a valid message about BESS risk assessment services.'
        };

        const result = ContactFormSchema.safeParse(invalidName);
        expect(result.success).toBe(false);
        if (!result.success) {
            const nameError = result.error.issues.find(issue => issue.path.includes('name'));
            expect(nameError?.message).toContain('invalid characters');
        }
    });

    it('rejects names that are too long', () => {
        const longName = {
            name: 'A'.repeat(101), // 101 caracteres, excede el máximo de 100
            email: 'valid@email.com',
            organization: 'BiP Omega',
            message: 'This is a valid message about BESS risk assessment services.'
        };

        const result = ContactFormSchema.safeParse(longName);
        expect(result.success).toBe(false);
        if (!result.success) {
            const nameError = result.error.issues.find(issue => issue.path.includes('name'));
            expect(nameError?.message).toContain('must not exceed 100 characters');
        }
    });

    it('rejects messages that are too long', () => {
        const longMessage = {
            name: 'Gustavo Bierge',
            email: 'valid@email.com',
            organization: 'BiP Omega',
            message: 'A'.repeat(1001) // 1001 caracteres, excede el máximo de 1000
        };

        const result = ContactFormSchema.safeParse(longMessage);
        expect(result.success).toBe(false);
        if (!result.success) {
            const messageError = result.error.issues.find(issue => issue.path.includes('message'));
            expect(messageError?.message).toContain('must not exceed 1000 characters');
        }
    });

    it('rejects organizations with invalid characters', () => {
        const invalidOrg = {
            name: 'Gustavo Bierge',
            email: 'valid@email.com',
            organization: 'BiP Omega@#$%^&*()',
            message: 'This is a valid message about BESS risk assessment services.'
        };

        const result = ContactFormSchema.safeParse(invalidOrg);
        expect(result.success).toBe(false);
        if (!result.success) {
            const orgError = result.error.issues.find(issue => issue.path.includes('organization'));
            expect(orgError?.message).toContain('invalid characters');
        }
    });

    it('accepts valid names with apóstrofes y guiones', () => {
        const validNames = [
            'María José',
            'Jean-Pierre',
            'O\'Connor',
            'D\'Arcy'
        ];

        validNames.forEach(name => {
            const validData = {
                name: name,
                email: 'valid@email.com',
                organization: 'BiP Omega',
                message: 'This is a valid message about BESS risk assessment services.'
            };

            const result = ContactFormSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });
    });
});
