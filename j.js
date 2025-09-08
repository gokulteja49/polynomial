const fs = require("fs");

function lagrangeInterpolation(points, k) {
  let secret = 0n;
  for (let i = 0; i < k; i++) {
    let xi = BigInt(points[i][0]);
    let yi = BigInt(points[i][1]);
    let num = 1n, den = 1n;

    for (let j = 0; j < k; j++) {
      if (i === j) continue;
      let xj = BigInt(points[j][0]);
      num *= (0n - xj);
      den *= (xi - xj);
    }
    secret += yi * num / den;
  }
  return secret;
}

function solve(filename) {
  console.log("\nProcessing:", filename);
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));
  const k = data.keys.k;

  let points = [];
  for (let key in data) {
    if (key === "keys") continue;
    let x = BigInt(key);
    let base = parseInt(data[key].base);
    let value = BigInt(parseInt(data[key].value, base));
    points.push([x, value]);
  }

  points.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  let chosen = points.slice(0, k);

  let secret = lagrangeInterpolation(chosen, k);
  console.log("C =", secret.toString());
}


solve("testcase1.json");
solve("testcase2.json");
