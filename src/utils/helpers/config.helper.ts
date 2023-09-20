import dotenv from 'dotenv';
import * as process from "process";
dotenv.config();
class configHelper {
    env: NodeJS.ProcessEnv;
    constructor(env : NodeJS.ProcessEnv) {
        this.env = env;
    }
    get<T = string>(key: string): T {
        return this.env[key] as unknown as T;
    }

    getOrThrow<T = string>(key: string): T {
        const value = this.get<T>(key);
        if (!value) {
            throw new Error(`Missing required environment variable ${key}`);
        }
        return value;
    }
}


export default new configHelper(process.env);