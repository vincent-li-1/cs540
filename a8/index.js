// Attribution: Young Wu's CS540 A8 Java Solution 2024

const fs = require("node:fs");
const beta = 0.6;
const n = 11;
let rewards = `6, -5, -3, 8, -4, 1, 10, -5, 3, 6, -5
9, 0, -8, 6, -5, -10, 2, 2, -1, -8, 8
-2, 4, -4, 4, 0, 8, -8, -9, -9, 8, -10
-10, 8, -1, -9, 8, -9, 8, 6, 2, -9, 9
-9, -2, -2, -6, -7, -2, -2, -2, 0, 1, -7
-2, -8, 7, -10, -8, -6, 3, 0, -8, -7, 9
7, 9, -1, 8, 4, -6, -8, 2, 0, 8, -1
-7, -4, -2, 5, 2, 1, 8, 7, 2, -7, -8
1, 2, 3, 7, 9, 0, 2, 8, 2, 8, 6
5, 1, -5, -9, -9, 4, 9, 1, -2, 6, 8
4, -7, -9, -7, 10, 7, 9, 3, 4, -3, -5`;
rewards = rewards.split("\n");
rewards = rewards.map((row) => row.split(",").map((value) => Number(value)));
let rewardsArray = [];
for (let i = 0; i < rewards.length; i++) {
  rewardsArray = rewardsArray.concat(rewards[i]);
}

function transition(state, action) {
  let y = Math.floor(state / n);
  let x = state % n;
  switch (action) {
    case 0:
      y = y === 0 ? n - 1 : y - 1;
      break;
    case 1:
      y = y === n - 1 ? 0 : y + 1;
      break;
    case 2:
      x = x === 0 ? n - 1 : x - 1;
      break;
    case 3:
      x = x === n - 1 ? 0 : x + 1;
      break;
    default:
      console.error("Invalid direction passed");
  }

  return y * n + x;
}

function valueIterate(v, r, pi) {
  let n = v.length;
  let vp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 4; j++) {
      let transitionIndex = transition(i, j);
      vp[i] += pi[i][j] * (r[transitionIndex] + beta * v[transitionIndex]);
    }
  }
  return vp;
}

function qIterate(q, r) {
  let n = q.length;
  let qp = [];
  for (let i = 0; i < n; i++) {
    let qArr = [0, 0, 0, 0];
    for (let j = 0; j < 4; j++) {
      let transitionIndex = transition(i, j);
      qArr[j] =
        r[transitionIndex] +
        beta * q[transitionIndex][getMaxAction(q[transitionIndex])];
    }
    qp.push(qArr);
  }
  return qp;
}

function getMaxAction(q) {
  let maxValue = Number.NEGATIVE_INFINITY;
  let index = 0;
  for (let i = 0; i < q.length; i++) {
    if (q[i] > maxValue) {
      maxValue = q[i];
      index = i;
    }
  }
  return index;
}

function getDifference(v, vp) {
  let difference = 0;
  for (let i = 0; i < v.length; i++) {
    difference += Math.abs(v[i] - vp[i]);
  }
  return difference;
}

// Q1:
let v = Array(n ** 2).fill(0);
let p = Array(n ** 2).fill(Array(4).fill(0.25));
let vp = valueIterate(v, rewardsArray, p);
let difference = getDifference(v, vp);
while (difference > 0.0001) {
  v = vp;
  vp = valueIterate(v, rewardsArray, p);
  difference = getDifference(v, vp);
}
v = v.map((value) => Number(value.toFixed(4)));

// Q2:
let pi = [];
for (let i = 0; i < n ** 2; i++) {
  let maxRewards = Number.NEGATIVE_INFINITY;
  let move = 0;
  for (let j = 0; j < 4; j++) {
    let transitionIndex = transition(i, j);
    if (rewardsArray[transitionIndex] > maxRewards) {
      maxRewards = rewardsArray[transitionIndex];
      move = j;
    }
  }
  pi.push(move);
}

// Q3:
let pip = [];
for (let i = 0; i < pi.length; i++) {
  pip.push([]);
  for (let j = 0; j < 4; j++) {
    if (pi[i] === j) {
      pip[i].push(1);
    } else {
      pip[i].push(0);
    }
  }
}

let v2 = Array(n ** 2).fill(0);
let vp2 = valueIterate(v2, rewardsArray, pip);
let difference2 = getDifference(v2, vp2);
while (difference2 > 0.0001) {
  v2 = vp2;
  vp2 = valueIterate(v2, rewardsArray, pip);
  difference2 = getDifference(v2, vp2);
}
v2 = v2.map((value) => Number(value.toFixed(4)));

// Q4:
let initialQ = [];
for (let i = 0; i < n ** 2; i++) {
  initialQ.push([]);
  for (let j = 0; j < 4; j++) {
    initialQ[i].push(0);
  }
}

// Q5:
let qp = qIterate(initialQ, rewardsArray);
qp = qp.map((row) => row.map((value) => Number(value.toFixed(4))));
let qDifference = 0;
for (let i = 0; i < qp.length; i++) {
  qDifference += getDifference(qp[i], initialQ[i]);
}
let q = [...qp];

// Q6:
let q1;
while (qDifference > 0.001) {
  q1 = qp;
  qp = qIterate(q1, rewardsArray);
  qDifference = 0;
  for (let i = 0; i < qp.length; i++) {
    qDifference += getDifference(qp[i], q1[i]);
  }
}
qp = qp.map((row) => row.map((value) => Number(value.toFixed(4))));

// Q7:
let qPolicy = [];
for (let i = 0; i < qp.length; i++) {
  qPolicy.push(getMaxAction(qp[i]));
}

// Q8:
let qValuePolicy = [];
for (let i = 0; i < qp.length; i++) {
  qValuePolicy.push(Math.max(...qp[i]));
}

// Q9:
let bestState = qValuePolicy.indexOf(Math.max(...qValuePolicy));

// Write answers to file
let answerText = `##a:8 ##id: vfli\n##1: ${v.join(",")}\n##2: ${pi.join(
  ","
)}\n##3: ${v2.join(",")}\n##4: ${initialQ.join("\n")}\n##5: ${q.join(
  "\n"
)}\n##6: ${qp.join("\n")}\n##7: ${qPolicy.join(",")}\n##8: ${qValuePolicy.join(
  ","
)}\n##9: ${bestState}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
