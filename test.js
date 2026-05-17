import fs from 'fs';
const problems = fs.readFileSync('src/data/problems.json', 'utf8');
console.log(problems.length);
