/**
 * @author Jaseem K
 *
 * @param name - name of the environment variable
 * @brief - This function retrieves the value of an environment variable by its name.
 * @returns string - The value of the environment variable.
 * @throws - If the environment variable is not set, it throws an error and exits the process.
 * @example - getEnv("PORT") // returns the value of the PORT environment variable
 */
export const getEnv = (name: string) => {
    try {
        const env = process.env[name];
        if (!env) {
            throw new Error(`Environment variable ${name} is not set`);
        }
        return env;
    } catch (error) {
        console.error(error);
        // throw error
        process.exit(1);
    }
};

export const PORT = parseInt(getEnv("PORT"));
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const AI_ENDPOIND = getEnv("AI_ENDPOIND");
export const AI_MODEL = getEnv("AI_MODEL");
export const NODE_ENV = getEnv("NODE_ENV");
export const LOG_LEVEL = getEnv("LOG_LEVEL") || "info";
export const FRONTEND_ENDPOINT = getEnv("FRONTEND_ENDPOINT");
