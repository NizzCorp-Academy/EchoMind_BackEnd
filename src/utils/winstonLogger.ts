import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

import { LoggerConfig } from "../types/log.types.js";
import { LOG_LEVEL, NODE_ENV } from "./env.js";

const defaultConfig: LoggerConfig = {
    logDir: path.join(process.cwd(), "logs"),
    level: LOG_LEVEL,
    maxSize: "20m",
    maxFiles: "7d",
    datePattern: "YYYY-MM-DD-HH",
};

export class Logger {
    private static instance: winston.Logger;

    public static getInstance(
        config: Partial<LoggerConfig> = {}
    ): winston.Logger {
        if (!Logger.instance) {
            const mergedConfig = { ...defaultConfig, ...config };

            // Create logs directory if it doesn't exist
            if (!fs.existsSync(mergedConfig.logDir)) {
                fs.mkdirSync(mergedConfig.logDir);
            }

            const fileTransport = new winston.transports.DailyRotateFile({
                dirname: mergedConfig.logDir,
                filename: "application-%DATE%.json",
                datePattern: mergedConfig.datePattern,
                zippedArchive: true,
                maxSize: mergedConfig.maxSize,
                maxFiles: mergedConfig.maxFiles,
                level: mergedConfig.level,
                format:
                    mergedConfig.format ||
                    winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json()
                    ),
            });

            // Handle transport errors
            fileTransport.on("error", (error) => {
                console.error("Logger transport error:", error);
            });

            // Create console transport for development
            const consoleTransport = new winston.transports.Console({
                level: mergedConfig.level,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                ),
            });

            Logger.instance = winston.createLogger({
                transports: [
                    fileTransport,
                    ...(NODE_ENV !== "production" ? [consoleTransport] : []),
                ],
            });
        }

        return Logger.instance;
    }

    public static log(level: string, message: string, meta?: any): void {
        const logger = Logger.getInstance();
        logger.log(level, message, meta);
    }
}

export const logger = Logger.getInstance();

// Export convenience methods
export const info = (message: string, meta?: any) => logger.info(message, meta);
export const error = (message: string, meta?: any) =>
    logger.error(message, meta);
export const warn = (message: string, meta?: any) => logger.warn(message, meta);
export const debug = (message: string, meta?: any) =>
    logger.debug(message, meta);
