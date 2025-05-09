import fs from "fs";
import path from "path";
import type { AggregatedResult, TestResult } from "@jest/test-result";
import type { Reporter } from "@jest/reporters";
import { LoggedError } from "../types/error.types";

class AppendReporter implements Reporter {
    onRunComplete(
        _: Set<unknown>,
        results: AggregatedResult
    ): void | Promise<void> {
        const logFile = path.resolve(
            __dirname,
            "../../",
            "jest-error-log.json"
        );

        const previousLogs: LoggedError[] = fs.existsSync(logFile)
            ? JSON.parse(fs.readFileSync(logFile, "utf-8"))
            : [];

        const currentErrors: LoggedError[] = results.testResults.flatMap(
            (test: TestResult) =>
                test.testResults
                    .filter((t) => t.status === "failed")
                    .map((failed) => ({
                        timestamp: new Date().toISOString(),
                        file: test.testFilePath,
                        title: failed.fullName,
                        message: failed.failureMessages,
                    }))
        );

        const updatedLogs = [...previousLogs, ...currentErrors];

        fs.writeFileSync(logFile, JSON.stringify(updatedLogs, null, 2));
        console.log("✍️  Errors appended to jest-error-log.json");
    }

    // Required to satisfy the Reporter interface
    getLastError?(): Error | void {
        return;
    }
}

export default AppendReporter;
// module.exports = AppendReporter;
