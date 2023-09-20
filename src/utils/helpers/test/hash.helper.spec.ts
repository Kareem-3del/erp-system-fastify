import { hash, compare } from '../hash.helper';

describe('hash.helper.ts', () => {
    describe('hash', () => {
        it('should hash a password', async () => {
            const password = 'some-password';
            const hashedPassword = await hash(password);

            expect(hashedPassword).toBeDefined();
            expect(hashedPassword).not.toEqual(password); // Make sure the password is hashed
        });
    });

    describe('compare', () => {
        it('should compare plain text password with hashed password', async () => {
            const password = 'some-password';
            const hashedPassword = await hash(password);

            const isMatch = await compare(password, hashedPassword);

            expect(isMatch).toBe(true); // The passwords should match
        });

        it('should detect incorrect passwords', async () => {
            const password = 'some-password';
            const wrongPassword = 'wrong-password';
            const hashedPassword = await hash(password);

            const isMatch = await compare(wrongPassword, hashedPassword);

            expect(isMatch).toBe(false); // The passwords should not match
        });
    });
});