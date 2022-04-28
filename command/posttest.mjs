import path from 'path';
import { dirname } from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const url = path.resolve(__dirname, '../coverage/lcov-report/index.html');
exec(`start ${url}`);
