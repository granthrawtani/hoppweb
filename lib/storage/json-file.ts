import { promises as fs } from "node:fs";
import path from "node:path";
import type { WaitlistEntry, WaitlistStore } from "./types";

/** Local development store: appends to a JSON file. Not for serverless production. */
export class JsonFileStore implements WaitlistStore {
  private queue: Promise<unknown> = Promise.resolve();

  constructor(private filePath: string) {}

  add(entry: WaitlistEntry) {
    // Serialize writes so concurrent requests can't clobber each other.
    const run = this.queue.then(() => this.write(entry));
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async read(): Promise<WaitlistEntry[]> {
    try {
      return JSON.parse(await fs.readFile(this.filePath, "utf8"));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
  }

  private async write(entry: WaitlistEntry) {
    const entries = await this.read();
    if (entries.some((e) => e.email === entry.email)) return { created: false };

    entries.push(entry);
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(entries, null, 2));
    await fs.rename(tmp, this.filePath);
    return { created: true };
  }
}
