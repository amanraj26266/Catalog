const fs = require('fs');

function readInputFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function decodeValue(value, base) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points) {
  let constantTerm = 0;

  for (let i = 0; i < points.length; i++) {
    const { x: xi, y: yi } = points[i];
    let term = yi;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const xj = points[j].x;
        term *= -xj / (xi - xj);
      }
    }

    constantTerm += term;
  }

  return Math.round(constantTerm);
}

function processTestCases(filePaths) {
  filePaths.forEach(filePath => {
    const data = readInputFile(filePath);
    const { n, k } = data.keys;

    const points = Object.keys(data)
      .filter(key => key !== "keys")
      .map(key => {
        const { base, value } = data[key];
        return {
          x: parseInt(key),
          y: decodeValue(value, base)
        };
      });
    if (points.length < k) {
      console.error(`Error: Not enough points to solve the polynomial for file ${filePath}.`);
      return;
    }
    const constantTerm = lagrangeInterpolation(points);
    console.log(`The constant term (c) for ${filePath} is: ${constantTerm}`);
  });
}
processTestCases(['input.json', 'input2.json']);
