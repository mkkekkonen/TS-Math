const path = require('path');
const fs = require('fs');

// const formulatePath = (fileName) => path.join('.', 'src', 'entryPoints', `${fileName}.ts`);
const formulatePath = (fileName) => `./src/entryPoints/${fileName}.ts`;

const generateEntryPoints = (entryPoints) => {
  const result = {};
  entryPoints.forEach((entryPoint) => {
    result[entryPoint] = formulatePath(entryPoint);
  });
  return result;
};

const getEntryPointNames = () => {
  const dir = path.resolve(__dirname, 'src', 'entryPoints');
  const files = fs.readdirSync(dir);
  return files.map((file) => {
    const splitFile = file.split('.');
    const [name] = splitFile;
    return name;
  });
};

module.exports = generateEntryPoints(getEntryPointNames());
