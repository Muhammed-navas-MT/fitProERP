import rfs from "rotating-file-stream";
import fs from "fs";

export function createRotatingFileStream(
  interval: `${number}M` | `${number}d` | `${number}h` | `${number}m` | `${number}s`,
  maxFiles: number,
  logDir: string
) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return rfs.createStream("app.log", {
    interval,
    path: logDir,
    maxFiles
  });
}
