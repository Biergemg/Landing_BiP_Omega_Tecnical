import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const expectedSha256 = 'c72887bd3b2a9892790f54543b85e1fb074d21377c2b79424ba71e156c5603cb';
const expectedSize = 21152;

const payload = Array.from({ length: 6 }, (_, index) => {
  const part = String(index + 1).padStart(2, '0');
  return readFileSync(
    resolve(root, 'report_data', 'public_case_study', `part-${part}.b64`),
    'utf8',
  ).trim();
}).join('');

const pdf = Buffer.from(payload, 'base64');
const actualSha256 = createHash('sha256').update(pdf).digest('hex');

if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) {
  throw new Error('Public case study payload is not a PDF');
}

if (pdf.length !== expectedSize || actualSha256 !== expectedSha256) {
  throw new Error(
    `Public case study PDF integrity mismatch: size=${pdf.length}, sha256=${actualSha256}`,
  );
}

const target = resolve(root, 'public', 'REPORT_PUBLIC_CASE_STUDY.pdf');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, pdf);
console.log(`Materialized ${target} (${pdf.length} bytes, sha256=${actualSha256})`);
