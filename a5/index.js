const fs = require("node:fs");

let testData;
let trainData;
let y;
let x;

try {
  trainData = fs.readFileSync("mnist_test.csv", "utf8");
  trainData = trainData.split("\n").map((row) => row.split(","));
  y = trainData.map((row) => (row[0] === "7" ? 1 : 0));
  x = trainData.map((row) =>
    row
      .map((value) => Number((Number(value) / 255).toFixed(2)))
      .slice(1, row.length)
  );
  testData = fs.readFileSync("test.txt", "utf8");
  testData = testData.split("\n").map((row) => row.split(","));
  xHat = testData.map((row) =>
    row.map((value) => Number((Number(value) / 255).toFixed(2)))
  );
} catch (err) {
  console.error(err);
}

let n = x.length;
let m = x[0].length;
let h = Math.sqrt(m);

function shuffleData() {
  let cur = x.length;
  while (cur !== 0) {
    let random = Math.floor(Math.random() * cur);
    cur--;
    let tempx = x[cur];
    let tempy = y[cur];
    x[cur] = x[random];
    y[cur] = y[random];
    x[random] = tempx;
    y[random] = tempy;
  }
}

function bound(value) {
  return Math.max(0.01, Math.min(0.99, value));
}
// Q1
let featureVector = x[100];

// Q2
let w = new Array(m);
for (let i = 0; i < m; i++) {
  w[i] = Math.random() * 2 - 1;
}
let b = Math.random() * 2 - 1;
let cost = Number.MAX_VALUE;
let costDiff = Number.MAX_VALUE;
let count = 1;
while (cost > 1 && costDiff > 0.0001 && count < 5000) {
  let alpha = 0.01 / Math.sqrt(count);
  // Calculate the a's
  let a = new Array(n);
  shuffleData();
  for (i = 0; i < n; i++) {
    let weightSum = 0;
    for (j = 0; j < m; j++) {
      weightSum += w[j] * x[i][j];
    }
    a[i] = 1 / (1 + Math.exp(-1 * (weightSum + b)));
  }
  // update w and b
  for (j = 0; j < m; j++) {
    let weightSum = 0;
    for (let i = 0; i < n; i++) {
      weightSum += (a[i] - y[i]) * x[i][j];
    }
    w[j] = w[j] - alpha * weightSum;
  }
  // update cost
  let newCost = 0;
  for (i = 0; i < n; i++) {
    let boundA = Math.max(0.01, Math.min(0.99, a[i]));
    newCost += y[i] * Math.log10(boundA) + (1 - y[i]) * Math.log10(1 - boundA);
  }
  const oldCost = cost;
  cost = -1 * newCost;
  costDiff = oldCost - cost;
  count++;
  console.log(costDiff);
  console.log(cost);
  console.log(count);
}
w = w.map((value) => Number(value.toFixed(4)));
b = Number(b.toFixed(4));

// Q3:
let activation = new Array(testData.length);
for (let i = 0; i < activation.length; i++) {
  let weightSum = 0;
  for (let j = 0; j < m; j++) {
    weightSum += w[j] * xHat[i][j];
  }
  activation[i] = 1 / (1 + Math.exp(-1 * (weightSum + b)));
}
activation = activation.map((value) => Number(value.toFixed(2)));

// Q4:
let predictedValues = activation.map((value) => (value >= 0.5 ? 1 : 0));

// Q5:
console.log("\nStarting Q5\n");
let w1 = Array(m).fill(Array(h).fill(0));
w1 = w1.map((row) => row.map(() => Math.random() * 2 - 1));
let b1 = Array(h).fill(0);
b1 = b1.map(() => Math.random() * 2 - 1);
let w2 = Array(h).fill(0);
w2 = w2.map(() => Math.random() * 2 - 1);
let b2 = Math.random() * 2 - 1;
let C = Number.MAX_VALUE;
let cDiff = Number.MAX_VALUE;
let count2 = 1;
let costArray = Array(n).fill(0);
while (C > 1 && cDiff > 0.0001 && count2 < 1000) {
  let alpha = 0.1 / Math.sqrt(count2);
  shuffleData();
  // Initialize arrays for a
  let a1 = Array(n).fill(Array(h).fill(0));
  let a2 = Array(n).fill(0);
  // Loop through all data points
  for (i = 0; i < n; i++) {
    // Calculate a1
    for (j = 0; j < h; j++) {
      let weightSum1 = 0;
      for (jPrime = 0; jPrime < m; jPrime++) {
        weightSum1 += x[i][jPrime] * w1[jPrime][j];
      }
      a1[i][j] = 1 / (1 + Math.exp(-1 * (weightSum1 + b1[j])));
    }
    // Calculate a2
    let weightSum2 = 0;
    for (j = 0; j < h; j++) {
      weightSum2 += a1[i][j] * w2[j];
    }
    a2[i] = 1 / (1 + Math.exp(-1 * (weightSum2 + b2)));
    // Update w1
    for (let jPrime = 0; jPrime < m; jPrime++) {
      for (let j = 0; j < h; j++) {
        let boundA2 = bound(a2[i]);
        let boundA1 = bound(a1[i][j]);
        let gradientW1 =
          (boundA2 - y[i]) *
          boundA2 *
          (1 - boundA2) *
          w2[j] *
          boundA1 *
          (1 - boundA1) *
          x[i][jPrime];
        w1[jPrime][j] = w1[jPrime][j] - alpha * gradientW1;
      }
    }
    // Update b1 and w2
    for (let j = 0; j < h; j++) {
      let boundA2 = bound(a2[i]);
      let boundA1 = bound(a1[i][j]);
      let gradientB1 =
        (boundA2 - y[i]) *
        boundA2 *
        (1 - boundA2) *
        w2[j] *
        boundA1 *
        (1 - boundA1);
      let gradientW2 = (boundA2 - y[i]) * boundA2 * (1 - boundA2) * boundA1;
      b1[j] = b1[j] - alpha * gradientB1;
      w2[j] = w2[j] - alpha * gradientW2;
    }
    // Update b2
    let boundA2 = bound(a2[i]);
    let gradientB2 = (boundA2 - y[i]) * boundA2 * (1 - boundA2);
    b2 = b2 - alpha * gradientB2;
    costArray[i] = (y[i] - boundA2) ** 2;
  }
  // update cost
  let newCost = costArray.reduce((acc, cur) => acc + cur, 0);
  const oldCost = C;
  C = 0.5 * newCost;
  cDiff = oldCost - C;
  count2++;
  console.log(cDiff);
  console.log(C);
  console.log(count2);
}
w1 = w1.map((row) => row.map((value) => Number(value.toFixed(4))));
b1 = b1.map((value) => Number(value.toFixed(4)));

// Q6:
w2 = w2.map((value) => Number(value.toFixed(4)));
b2 = Number(b2.toFixed(4));

// Q7:
let aPrime = Array(testData.length).fill(0);
for (let i = 0; i < testData.length; i++) {
  let weightSum = 0;
  for (let j = 0; j < h; j++) {
    let weightSumPrime = 0;
    for (let jPrime = 0; jPrime < m; jPrime++) {
      weightSumPrime += xHat[i][jPrime] * w1[jPrime][j];
    }
    let a1Prime = 1 / (1 + Math.exp(-1 * (weightSumPrime + b1[j])));
    weightSum += a1Prime * w2[j];
  }
  aPrime[i] = 1 / (1 + Math.exp(-1 * (weightSum + b2)));
}
aPrime = aPrime.map((value) => Number(value.toFixed(2)));

// Q8:
let predictedValuesPrime = aPrime.map((value) => (value >= 0.5 ? 1 : 0));

// Q9:
console.log(aPrime);
let index = aPrime.findIndex((value) => value - 0.5 < 0 && value - 0.5 > -0.1);
let featureVectorPrime = xHat[index];

// Write answers to file
let answerText = `##a:5 ##id: vfli\n##1: ${featureVector.join(
  ","
)}\n##2: ${w.join(",")},${b}\n##3: ${activation.join(
  ","
)}\n##4: ${predictedValues.join(",")}\n##5: ${w1.join("\n")}\n${b1.join(
  ","
)}\n##6: ${w2.join(",")},${b2}\n##7: ${aPrime.join(
  ","
)}\n##8: ${predictedValuesPrime.join(",")}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
