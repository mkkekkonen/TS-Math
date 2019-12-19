const formulatePath = function(fileName) {
  return './src/entryPoints/' + fileName + '.ts';
};

const generateEntryPoints = entryPoints => {
  const result = {};
  entryPoints.forEach(entryPoint => {
    result[entryPoint] = formulatePath(entryPoint);
  });
  return result;
};

const entryPointNames = [
  'foobar',
  '1_1_distancepoints',
];

module.exports = generateEntryPoints(entryPointNames);
