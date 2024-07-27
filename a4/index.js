const { info } = require("node:console");
const fs = require("node:fs");

let data;
let testData;

try {
  data = fs.readFileSync("breast-cancer-wisconsin.data", "utf8");
  data = data.split("\n");
  data = data
    .filter((line) => !line.includes("?"))
    .map((line) => line.split(",").map((value) => Number(value)));
  testData = fs.readFileSync("test.txt", "utf8");
  testData = testData.split("\n");
  testData = testData
    .filter((line) => !line.includes("?"))
    .map((line) => line.split(",").map((value) => Number(value)));
} catch (err) {
  console.error(err);
}

let decisionTree = [];
function splitData(data, level) {
  const label = data[0][10];
  let numLabel = data.filter((line) => line[10] === label);
  if (numLabel.length === data.length) {
    const decisionTreeNode = {
      level: level,
      value: label,
      isLeaf: true,
    };
    decisionTree.push(decisionTreeNode);
    return decisionTreeNode;
  }
  const features = [8, 3, 4, 5, 9, 6];
  let feature;
  let maxInformationGain = Number.MIN_VALUE;
  let maximizedInformationGain;
  features.forEach((value) => {
    const IG = maximizeInformationGain(data, value);
    if (IG.informationGain > maxInformationGain) {
      maximizedInformationGain = IG;
      maxInformationGain = IG.informationGain;
      feature = value;
    }
  });
  maxInformationGain = Number(maxInformationGain.toFixed(4));
  if (maxInformationGain === 0) {
    const label =
      data.filter((line) => line[10] === 2).length >
      data.filter((line) => line[10] === 4).length
        ? 2
        : 4;
    const decisionTreeNode = {
      level: level,
      value: label,
      isLeaf: true,
    };
    decisionTree.push(decisionTreeNode);
    return decisionTreeNode;
  }
  let decisionTreeNode = {
    feature: feature,
    IG: maximizedInformationGain,
    level: level,
    index: feature + 1,
    isLeaf: false,
  };
  decisionTree.push(decisionTreeNode);
  let subset1 = data.filter(
    (line) => line[feature] <= maximizedInformationGain.splitValue
  );
  let subset2 = data.filter(
    (line) => line[feature] > maximizedInformationGain.splitValue
  );
  splitData(subset1, level + 1);
  splitData(subset2, level + 1);
  decisionTreeNode = {
    ...decisionTreeNode,
    leftSubNode: splitData(subset1, level + 1),
    rightSubNode: splitData(subset2, level + 1),
  };
  return decisionTreeNode;
}

function maximizeInformationGain(data, x) {
  const uniqueTValues = new Set();
  data.forEach((entry) => uniqueTValues.add(entry[x]));
  let n2minus = 0;
  let n2plus = 0;
  let n4minus = 0;
  let n4plus = 0;
  let instances = [];
  let splitValue = 0;
  let informationGain = Number.MIN_VALUE;
  uniqueTValues.forEach((value) => {
    n2minus = data.filter(
      (entry) => entry[10] === 2 && entry[x] <= value
    ).length;
    n2plus = data.filter((entry) => entry[10] === 2 && entry[x] > value).length;
    n4minus = data.filter(
      (entry) => entry[10] === 4 && entry[x] <= value
    ).length;
    n4plus = data.filter((entry) => entry[10] === 4 && entry[x] > value).length;
    const nminus = n2minus + n4minus;
    const nplus = n2plus + n4plus;
    const ntotal = nminus + nplus;
    const conditionalEntropy =
      -1 * (n2minus / ntotal) * log2(n2minus / nminus) -
      (n2plus / ntotal) * log2(n2plus / nplus) -
      (n4minus / ntotal) * log2(n4minus / nminus) -
      (n4plus / ntotal) * log2(n4plus / nplus);
    const entropy = getEntropy(data);
    if (entropy - conditionalEntropy > informationGain) {
      informationGain = entropy - conditionalEntropy;
      instances = [n2minus, n2plus, n4minus, n4plus];
      splitValue = value;
    }
  });
  return {
    instances: instances,
    informationGain: Number(informationGain.toFixed(4)),
    splitValue: splitValue,
  };
}

function log2(x) {
  return Math.log(x) / Math.log(2);
}

function getLabelInstances(data) {
  let instances = [0, 0];
  data.forEach((entry) => (entry[10] === 2 ? instances[0]++ : instances[1]++));
  return instances;
}

function getEntropy(data) {
  let instances = getLabelInstances(data);
  totalInstances = instances[0] + instances[1];
  const entropy =
    -1 * (instances[0] / totalInstances) * log2(instances[0] / totalInstances) -
    (instances[1] / totalInstances) * log2(instances[1] / totalInstances);
  return entropy;
}

function classifyData(data, decisionTree) {
  const classifiedData = data.map((line) => {
    return classifyEntry(line, decisionTree);
  });
  return classifiedData;
}

function classifyEntry(entry, decisionTree) {
  if (decisionTree.isLeaf) {
    return decisionTree.value;
  }
  if (entry[decisionTree.feature] <= decisionTree.IG.splitValue) {
    return classifyEntry(entry, decisionTree.leftSubNode);
  } else {
    return classifyEntry(entry, decisionTree.rightSubNode);
  }
}

// Q1:
let instances = getLabelInstances(data);

// Q2:
const entropy = getEntropy(data);

// Q3 + Q4:
const q3res = maximizeInformationGain(data, 7);

// Q5:
const decisionTreeNode = splitData(data, 0);

// // Q7:
let classifiedLabels = classifyData(testData, decisionTreeNode);

// Write answers to file
let answerText = `##a:4 ##id: vfli\n##1: ${instances.join(
  ","
)}\n##2: ${entropy.toFixed(4)}\n##3: ${q3res.instances.join(
  ","
)}\n##4: ${q3res.informationGain.toFixed(4)}\n##5:
if (x4 <= 2)
 if (x7 <= 5)
  if (x10 <= 7) return 2
  else return 4
 else return 4
else
 if (x7 <= 2)
  if (x6 <= 3) return 2
  else return 4
 else
  if (x7 <= 8)
   if (x9 <= 7)
    if (x5 <= 3)
     if (x9 <= 5) return 4
     else
      if (x9 <= 6) return 4
      else return 2
    else return 4
   else return 4
  else return 4
 else return 4
\n##6: 7\n##7: ${classifiedLabels.join(",")}\n##8: if (x4 <= 2)
 if (x7 <= 5)
  if (x10 <= 7) return 2
  else return 4
 else return 4
else
 if (x7 <= 2)
  if (x6 <= 3) return 2
  else return 4
 else
  if (x7 <= 8)
   if (x9 <= 7)
    if (x5 <= 3)
     if (x9 <= 5) return 4
     else
      if (x9 <= 6) return 4
      else return 2
    else return 4
   else return 4
  else return 4
 else return 4\n##9: ${classifiedLabels.join(",")}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
