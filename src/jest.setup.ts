import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, 'jest-log.txt');
const logStream = fs.createWriteStream(logFilePath, { flags: 'w' }); // Overwrite each time

const originalLog = console.log;

console.log = (...args: unknown[]) => {
  const message = args.map(String).join(' ') + '\n';
  logStream.write(message);
  originalLog(...args); // Optional: still output to terminal
};

// Ensure stream closes after all tests are done
afterAll(() => {
  logStream.end();
});
