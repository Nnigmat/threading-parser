const yargs = require('yargs/yargs');
const path = require('path');
const fs = require('fs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .scriptName('threading-parser')
  .usage('$0 --i [filepath] --o [filepath]')
  .option('output', {
    alias: 'o',
    demandOption: true,
    default: 'output.txt',
    describe: 'Output path',
    type: 'string',
  })
  .option('input', {
    alias: 'i',
    demandOption: true,
    default: 'input.txt',
    describe: 'input path',
    type: 'string',
  })
  .option('delimeter', {
    alias: 'd',
    demandOption: true,
    default: '-----\n',
    describe: 'how to divide list of PEGS',
    type: 'string',
  }).argv;

const inputPath = path.join(__dirname, argv.input);
const outputPath = path.join(__dirname, argv.output);
const delimeter = argv.delimeter;

const content = fs.readFileSync(inputPath, { encoding: 'utf-8' });
const lines = content.split('\n');

const result = lines.reduce((acc, line) => {
  const match = line.match(/\bPEG_(\d+)\b/);

  if (match) {
    return [...acc, match[1]];
  }

  return acc;
}, []);

const toWrite = result.join(delimeter);

fs.writeFileSync(outputPath, toWrite);
