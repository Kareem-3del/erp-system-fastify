import config from '../config.helper'; // Adjust the path as per your project structure
describe('config.helper', () => {
    describe('get', () => {
        it('should return the value of an existing environment variable', () => {
            process.env.TEST_VARIABLE = 'testValue';
            const result = config.get('TEST_VARIABLE');
            expect(result).toEqual('testValue');
        });

        it('should return undefined for a non-existing environment variable', () => {
            const result = config.get('NON_EXISTING_VARIABLE');
            expect(result).toBe(undefined);
        });
    });

    describe('getOrThrow', () => {
        it('should return the value of an existing environment variable', () => {
            process.env.TEST_VARIABLE = 'testValue';
            const result = config.getOrThrow('TEST_VARIABLE');
            expect(result).toEqual('testValue');
        });

        it('should throw an error for a non-existing environment variable', () => {
            try {
                config.getOrThrow('NON_EXISTING_VARIABLE');
                // If the above line doesn't throw an error, this line will not be reached
                // So we can fail the test if it does reach here

            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error?.['message']).toEqual('Missing required environment variable NON_EXISTING_VARIABLE');
            }
        });
    });
});
