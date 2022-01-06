const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Path to build folder
const buildPath = path.resolve(__dirname, 'build');

// Deleting the existing build folder, if any
fs.removeSync(buildPath);

// Path to campaign contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

// source code of Campaign.sol file
const source = fs.readFileSync(campaignPath, 'utf-8');

// Compiled output from Campaign.sol file
const output = solc.compile(source, 1).contracts;

// Create the build directory, if not present
fs.ensureDirSync(buildPath);

// Creating json files containing compiled contract codes
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}