import { writeDistAllFromSourceAll, writeSourceAll } from "./src/writer.js";

try {
  const sourceAllJsonData = await writeSourceAll();
  await writeDistAllFromSourceAll(sourceAllJsonData);
} catch (err) {
  console.error("发生错误:", err);
  process.exit(1);
}
