import { Logform } from "winston";

export interface LoggerConfig {
    logDir: string;
    level: string;
    maxSize: string;
    maxFiles: string;
    datePattern: string;
    format?: Logform.Format;
}
