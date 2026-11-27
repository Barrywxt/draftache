// make.fun - Invent a Word We Need
// Entry: one new word and its one-line definition (at most 140 characters)
import fs from 'node:fs';
import path from 'node:path';
const line = "Draftache (n.): the small ache of a message you typed, read twice, and deleted instead of sending.";
// The competition's entry gate: a single line, 1-140 characters, not only whitespace.
const len = [...line].length;
if (!line.trim() || len < 1 || len > 140 || line.includes('\n')) {
  throw new Error('Line must be a single line of 1-140 characters and not only whitespace');
}
const dir = process.env.OUTPUT_DIR || '/output';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'entry.txt'), line, 'utf8');
// Read back and confirm what was written is exactly the line.
// v2: also assert no trailing newline, which the entry gate forbids.
const written = fs.readFileSync(path.join(dir, 'entry.txt'), 'utf8');
if (written !== line || written.endsWith('\n')) {
  throw new Error(`Wrote ${[...written].length} chars, expected ${len} with no trailing newline`);
}
console.log(`Wrote word (${len} chars) to ${path.join(dir, 'entry.txt')}`);
