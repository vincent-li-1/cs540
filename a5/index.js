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
  let alpha = 0.001 / Math.sqrt(count);
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

// Write answers to file
let answerText = `##a:5 ##id: vfli\n##1: ${featureVector.join(
  ","
)}\n##2: ${w.join(",")},${b}\n##3: ${activation.join(
  ","
)}\n##4: ${predictedValues.join(",")}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
