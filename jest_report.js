import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class JestReport {
  constructor(globalConfig, reporterOptions, reporterContext) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  onRunComplete(contexts, results) {
    const date = new Date();
    const filename = date.toDateString().replace(/\s+/g, "-") + "-test.json";
    const filePath = path.resolve(__dirname, "./reports", filename);
    // const logFile = path.resolve(__dirname, "/jset-results.json");
    const jsonResult = JSON.parse(
      //   fs.readFileSync(logFile, "utf-8")
      fs.readFileSync("./jest-results.json", "utf-8")
    );
    fs.appendFile(
      filePath,
      JSON.stringify(jsonResult, null, 2) + ",\n",
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  }
}

export default JestReport;
