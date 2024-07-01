// Attribution: Young Wu and Ainur Ainabekova's CS540 P4 Solution 2020

const fs = require("node:fs");

let data;
let images;
let pca;
const k = 25;
const n = 100;

try {
  data = fs.readFileSync("mnist_train.csv", "utf8");
  data = data.split("\n");
  data = data.map((line) => line.split(",").slice(1, data.length));
  images = fs.readFileSync("test.txt", "utf8");
  images = images.split("\n");
  images = images.map((line) => line.split(", "));
  pca = fs.readFileSync("pca.csv", "utf8");
  pca = pca.split("\n");
  pca = pca
    .map((line) => line.split(",").map((value) => Number(value)))
    .slice(0, 25);
} catch (err) {
  console.error(err);
}

// Q1
let unitVectors = [];
for (let i = 0; i < 25; i++) {
  const array = new Array(784).fill(0);
  array[i] = 1;
  unitVectors.push(array);
}

// Q2
const projectedLengths1 = getProjectedLengths(images, unitVectors);

// Q3
let reconstructedImages = reconstructImages(unitVectors, projectedLengths1);

// Q5
let projectedLengths2 = getProjectedLengths(images, pca);
projectedLengths2 = projectedLengths2.map((vector) =>
  vector.map((value) => Number(value.toFixed(4)))
);

// Q6
let reconstructedImages2 = reconstructImages(pca, projectedLengths2);

// Q7
let projectedLengths3 = getProjectedLengths(data, pca);
let nearestNeighbors = [];
let nearestIdxs = [];
projectedLengths2.forEach((PCA) => {
  const nearestIdx = getNearestIdx(PCA, projectedLengths3);
  const nearestNeighbor = projectedLengths3[nearestIdx];
  nearestIdxs.push(nearestIdx);
  nearestNeighbors.push(nearestNeighbor);
});

// Q8
let nearestImages = nearestIdxs.map((idx) => data[idx]);

// Q9
let reconstructedImages3 = reconstructImages(pca, nearestNeighbors);

function dot(v1, v2) {
  let sum = 0;
  for (let i = 0; i < v1.length; i++) {
    sum += v1[i] * v2[i];
  }
  return sum;
}

function getProjectedLengths(images, vectors) {
  let projections = [];
  for (let i = 0; i < images.length; i++) {
    let image = images[i].map((value) => Number(value));
    image = scaleImage(image);
    let projectionForImage = [];
    vectors.forEach((vector) => {
      const dotProduct = dot(vector, image);
      projectionForImage.push(Number(dotProduct.toFixed(4)));
    });
    projections.push(projectionForImage);
  }
  return projections;
}

function reconstructImages(vectors, projectedLengths) {
  let reconstructed = [];
  // Each iteration represents 1 image
  for (let i = 0; i < n; i++) {
    let arr = vectors[0].map((value) => value * projectedLengths[i][0]);
    // Each iteration represents adding one projection
    for (let j = 1; j < projectedLengths[i].length; j++) {
      const v = vectors[j].map((value) => value * projectedLengths[i][j]);
      arr = arr.map((value, idx) => Number((value + v[idx]).toFixed(4)));
    }
    reconstructed.push(arr);
  }
  return reconstructed;
}

function getNearestIdx(vector, vectors) {
  let min = Number.MAX_VALUE;
  let idx = 0;
  for (let i = 0; i < vectors.length; i++) {
    const dist = getDistance(vector, vectors[i]);
    if (dist < min) {
      min = dist;
      idx = i;
    }
  }
  return idx;
}

function getDistance(v1, v2) {
  let dist = 0;
  for (let i = 0; i < v1.length; i++) {
    dist += (v1[i] - v2[i]) ** 2;
  }
  return Math.sqrt(dist);
}

function scaleImage(image) {
  return image.map((value) => value / 255);
}
// Write all answers to file

let answerText = `##a:3 ##id: vfli\n##1: ${unitVectors.join(
  "\n"
)}\n##2: ${projectedLengths1.join("\n")}\n##3: ${reconstructedImages.join(
  "\n"
)}\n##4: ${pca.join("\n")}\n##5: ${projectedLengths2.join(
  "\n"
)}\n##6: ${reconstructedImages2.join("\n")}\n##7: ${nearestNeighbors.join(
  "\n"
)}\n##8: ${nearestImages.join("\n")}\n##9: ${reconstructedImages3.join("\n")}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
