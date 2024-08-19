const fs = require("node:fs");

const centers = [
  50, 32, 23, 32, 27, 23, 31, 31, 23, 23, 24, 23, 33, 31, 31, 26, 23, 28, 23,
  23, 28, 43, 27, 33, 23, 23, 23, 23, 23, 23, 28, 23, 23, 23, 38, 27, 40, 23,
  23, 34, 23, 23, 24, 40, 25, 23, 25, 42, 32, 33, 37,
];
const actions = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const h = 22;
const g = 23;
const d = 1;
const u = 10;
const f = 1;
const n = 25;
const N = 5;

const startX = 0;
const startY = 50;

function bound(value) {
  return Math.max(0.01, Math.min(0.99, value));
}

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

function getFitnessOfNeuralNetwork(w1, w2, b1, b2) {
  let neuralActions = [];
  let neuralDistances = [];
  currentPos = [startX, startY];
  let fitnessValue;
  for (let i = 0; i < actions.length; i++) {
    // Calculate distance from current position to next center
    const nextPipeIndex = Math.ceil(i / h);
    const xDist = nextPipeIndex * h - currentPos[0];
    const yDist = centers[nextPipeIndex] - currentPos[1];
    neuralDistances.push([xDist, yDist]);

    // Check if we've hit a pipe
    if (i % h === 0) {
      const yDistToCenter = Math.abs(currentPos[1] - centers[nextPipeIndex]);
      if (yDistToCenter > 11) {
        fitnessValue =
          fitnessValue === undefined
            ? currentPos[0] - yDistToCenter
            : fitnessValue;
      }
    }

    // Calculate activation value for given distance;
    let weightSum = 0;
    let aPrime = 0;
    for (let j = 0; j < n; j++) {
      let weightSumPrime = 0;
      for (let jPrime = 0; jPrime < 2; jPrime++) {
        weightSumPrime += neuralDistances[i][jPrime] * w1[jPrime][j];
      }
      let a1Prime = 1 / (1 + Math.exp(-1 * (weightSumPrime + b1[j])));
      weightSum += a1Prime * w2[j];
    }
    aPrime = 1 / (1 + Math.exp(-1 * (weightSum + b2)));

    if (aPrime >= 0.5) {
      neuralActions.push(1);
    } else {
      neuralActions.push(0);
    }
    currentPos[0] = currentPos[0] + f;
    if (neuralActions[i] === 1) {
      currentPos[1] = currentPos[1] + u;
    } else {
      currentPos[1] = currentPos[1] - d;
    }
  }

  fitnessValue = fitnessValue === undefined ? currentPos[0] : fitnessValue;

  return {
    fitnessValue: fitnessValue,
    actions: neuralActions,
    distances: neuralDistances,
  };
}

function crossOver(i1, i2, w1p, w2p, b1p, b2p) {
  let w1index1 = Math.round(Math.random() * (w1p[0].length - 1));
  let w1index2 = Math.round(Math.random() * (w1p[0][0].length - 1));
  let w2index = Math.round(Math.random() * (w2p[0].length - 1));
  let b1index = Math.round(Math.random() * (b1p[0].length - 1));
  for (let i = w1index1; i < w1p[0].length; i++) {
    for (let j = w1index2; j < w1p[0][0].length; j++) {
      let temp = w1p[i1][i][j];
      w1p[i1][i][j] = w1p[i2][i][j];
      w1p[i2][i][j] = temp;
    }
  }
  for (let i = w2index; i < w2p[0].length; i++) {
    let temp = w2p[i1][i];
    w2p[i1][i] = w2p[i2][i];
    w2p[i2][i] = temp;
  }
  for (let i = b1index; i < b1p[0].length; i++) {
    let temp = b1p[i1][i];
    b1p[i1][i] = b1p[i2][i];
    b1p[i2][i] = temp;
  }
  let temp = b2p[i1];
  b2p[i1] = b2p[i2];
  b2p[i2] = temp;
}

function mutateNetwork(w1, w2, b1, b2) {
  let mutation = 0.05;
  for (let i = 0; i < w1.length; i++) {
    for (let j = 0; j < w1[0].length; j++) {
      if (Math.random() < mutation) {
        w1[i][j] = w1[i][j] / (Math.random() / 2);
        w2[j] = w2[j] / (Math.random() / 2);
        b1[j] = b1[j] / (Math.random() / 2);
        b2 = b2 / (Math.random() / 2);
      }
    }
  }
}
// Q1
let distances = [];

let currentPos = [startX, startY];

for (let i = 0; i < actions.length; i++) {
  // Calculate distance from current position and push to array
  const nextPipeIndex = Math.ceil(i / h);
  const xDist = nextPipeIndex * h - currentPos[0];
  const yDist = centers[nextPipeIndex] - currentPos[1];
  distances.push([xDist, yDist]);

  // Move based on action
  currentPos[0] = currentPos[0] + f;
  if (actions[i] === 1) {
    currentPos[1] = currentPos[1] + u;
  } else {
    currentPos[1] = currentPos[1] - d;
  }
}

let x = [];
let y = [];
for (let i = 0; i < actions.length; i++) {
  y.push(actions[i]);
  x.push(distances[i]);
}

// Q2 + Q3:
let w1 = Array(2).fill(Array(n).fill(0));
let b1 = Array(n).fill(0);
let w2 = Array(n).fill(0);
let b2 = Math.random() * 2 - 1;
w1 = w1.map((row) => row.map(() => Math.random() * 2 - 1));
b1 = b1.map(() => Math.random() * 2 - 1);
w2 = w2.map(() => Math.random() * 2 - 1);
let count = 1;
let C = Number.MAX_VALUE;
let cDiff = Number.MAX_VALUE;
let costArray = Array(y.length).fill(0);
while (C > 1 && cDiff > 0.0001 && count < 1000) {
  let alpha = 0.1 / Math.sqrt(count);
  shuffleData();
  // Initialize arrays for a
  let a1 = Array(y.length).fill(Array(n).fill(0));
  let a2 = Array(y.length).fill(0);
  // Loop through all data points
  for (let i = 0; i < y.length; i++) {
    // Calculate a1
    for (let j = 0; j < n; j++) {
      let weightSum1 = 0;
      for (let jPrime = 0; jPrime < 2; jPrime++) {
        weightSum1 += x[i][jPrime] * w1[jPrime][j];
      }
      a1[i][j] = 1 / (1 + Math.exp(-1 * (weightSum1 + b1[j])));
    }
    // Calculate a2
    let weightSum2 = 0;
    for (let j = 0; j < n; j++) {
      weightSum2 += a1[i][j] * w2[j];
    }
    a2[i] = 1 / (1 + Math.exp(-1 * weightSum2 + b2));
    // Update w1s
    for (let jPrime = 0; jPrime < 2; jPrime++) {
      for (let j = 0; j < n; j++) {
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
    for (let j = 0; j < n; j++) {
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
  const oldCost = C;
  C = 0.5 * costArray.reduce((acc, cur) => acc + cur, 0);
  cDiff = oldCost - C;
  count++;
  console.log(cDiff);
  console.log(C);
  console.log(count);
}
w1 = w1.map((row) => row.map((value) => Number(value.toFixed(4))));
b1 = b1.map((value) => Number(value.toFixed(4)));
w2 = w2.map((value) => Number(value.toFixed(4)));
b2 = Number(b2.toFixed(4));

// Q4 + Q5:
let neuralActions = [];
let neuralDistances = [];
currentPos = [startX, startY];
let fitnessValue;
for (let i = 0; i < actions.length; i++) {
  // Calculate distance from current position to next center
  const nextPipeIndex = Math.ceil(i / h);
  const xDist = nextPipeIndex * h - currentPos[0];
  const yDist = centers[nextPipeIndex] - currentPos[1];
  neuralDistances.push([xDist, yDist]);

  // Check if we've hit a pipe
  if (i % h === 0) {
    const yDistToCenter = Math.abs(currentPos[1] - centers[nextPipeIndex]);
    if (yDistToCenter > 11) {
      fitnessValue =
        fitnessValue === undefined
          ? currentPos[0] - yDistToCenter
          : fitnessValue;
    }
  }

  // Calculate activation value for given distance;
  let weightSum = 0;
  let aPrime = 0;
  for (let j = 0; j < n; j++) {
    let weightSumPrime = 0;
    for (let jPrime = 0; jPrime < 2; jPrime++) {
      weightSumPrime += neuralDistances[i][jPrime] * w1[jPrime][j];
    }
    let a1Prime = 1 / (1 + Math.exp(-1 * (weightSumPrime + b1[j])));
    weightSum += a1Prime * w2[j];
  }
  aPrime = 1 / (1 + Math.exp(-1 * (weightSum + b2)));

  if (aPrime >= 0.5) {
    neuralActions.push(1);
  } else {
    neuralActions.push(0);
  }
  currentPos[0] = currentPos[0] + f;
  if (neuralActions[i] === 1) {
    currentPos[1] = currentPos[1] + u;
  } else {
    currentPos[1] = currentPos[1] - d;
  }
}

fitnessValue = fitnessValue === undefined ? currentPos[0] : fitnessValue;

// Q6
let w1p = Array(N).fill(Array(2).fill(Array(n).fill(0)));
let b1p = Array(N).fill(Array(n).fill(0));
let w2p = Array(N).fill(Array(n).fill(0));
let b2p = Array(N).fill(Math.random() * 2 - 1);
w1p = w1p.map((network) =>
  network.map((row) => row.map(() => Math.random() * 2 - 1))
);
b1p = b1p.map((row) => row.map(() => Math.random() * 2 - 1));
w2p = w2p.map((row) => row.map(() => Math.random() * 2 - 1));
let fitnessArr = [];
for (let i = 0; i < N; i++) {
  let fitness = getFitnessOfNeuralNetwork(w1p[i], w2p[i], b1p[i], b2p[i]);
  fitnessArr.push(fitness.fitnessValue);
}
let reproProb = [];
const fitnessSum = fitnessArr.reduce((acc, cur) => acc + cur, 0);
fitnessArr.forEach((fitness) => reproProb.push(fitness / fitnessSum));
for (let i = 0; i < 10; i++) {
  console.log(fitnessArr);
  let sortedFitness = fitnessArr.toSorted();
  let i1 = fitnessArr.indexOf(sortedFitness[N - 1]);
  let i2 = fitnessArr.indexOf(sortedFitness[N - 2]);
  if (i2 === i1) {
    i2 = fitnessArr.indexOf(sortedFitness[N - 2], i1 + 1);
  }
  crossOver(i1, i2, w1p, w2p, b1p, b2p);
  for (let j = 0; j < N; j++) {
    if (j !== i1 && j !== i2) {
      mutateNetwork(w1p[j], w2p[j], b1p[j], b2p[j]);
    }
    const fitness = getFitnessOfNeuralNetwork(w1p[j], w2p[j], b1p[j], b2p[j]);
    fitnessArr[j] = fitness.fitnessValue;
  }
  const fitnessSum = fitnessArr.reduce((acc, cur) => acc + cur, 0);
  fitnessArr.forEach((fitness, idx) => (reproProb[idx] = fitness / fitnessSum));
}

// Q7
let index = fitnessArr.indexOf(Math.max(...fitnessArr));
let bestw1 = w1p[index];
let bestw2 = w2p[index];
let bestb1 = b1p[index];
let bestb2 = b2p[index];
bestw1 = bestw1.map((row) => row.map((value) => Number(value.toFixed(4))));
bestw2 = bestw2.map((value) => Number(value.toFixed(4)));
bestb1 = bestb1.map((value) => Number(value.toFixed(4)));
bestb2 = Number(bestb2.toFixed(4));

// Q8
let fitness = getFitnessOfNeuralNetwork(bestw1, bestw2, bestb1, bestb2);

// Write answers to file
let answerText = `##a:7 ##id: vfli\n##1: ${distances.join(
  "\n"
)}\n##2: ${w1.join("\n")}\n${b1.join(", ")}\n##3: ${w2.join(
  ","
)},${b2}\n##4: ${neuralActions.join(
  ","
)}\n##5: ${fitnessValue}\n##6: ${bestw1.join("\n")}\n${bestb1.join(
  ", "
)}\n##7: ${bestw2.join(",")},${b2}\n##8: ${fitness.actions.join(",")}\n##9: ${
  fitness.fitnessValue
}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
