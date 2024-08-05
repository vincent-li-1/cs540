const fs = require("node:fs");

let h = 57;
let w = 55;

class Node {
  constructor(i, j, parent) {
    this.i = i;
    this.j = j;
    this.parent = parent;
  }
}

class CostNode {
  constructor(i, j, parent, cost) {
    this.i = i;
    this.j = j;
    this.parent = parent;
    this.cost = cost;
  }
}

class QNode {
  constructor(node, priority) {
    this.i = node.i;
    this.j = node.j;
    this.parent = node.parent;
    this.cost = node.cost;
    this.priority = priority;
  }
}

class PQueue {
  constructor() {
    this.items = [];
  }

  enqueue(node, priority) {
    let qNode = new QNode(node, priority);
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (qNode.priority < this.items[i].priority) {
        this.items.splice(i, 0, qNode);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(qNode);
    }
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.items.shift();
    }
    return null;
  }

  getLength() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function bfs() {
  let queue = [];
  let startNode = new Node(0, Math.floor(w / 2), null, null);
  queue.push(startNode);
  let curNode = startNode;
  let visited = new Set();
  let visitedArr = [];
  visitedArr.push(startNode);
  visited.add(`${curNode.i},${curNode.j}`);
  while (
    !(curNode.i === h - 1 && curNode.j === Math.floor(w / 2)) &&
    queue.length > 0
  ) {
    curNode = queue.shift();
    let successorString = successorMatrix[curNode.i][curNode.j];
    let nodeString = `${curNode.i},${curNode.j}`;
    if (!visited.has(nodeString)) {
      visited.add(nodeString);
      visitedArr.push(curNode);
    }
    if (successorString.includes("U") && curNode.i > 0) {
      let neighbor = new Node(curNode.i - 1, curNode.j, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        queue.push(neighbor);
      }
    }
    if (successorString.includes("D") && curNode.i < h - 1) {
      let neighbor = new Node(curNode.i + 1, curNode.j, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        queue.push(neighbor);
      }
    }
    if (successorString.includes("L") && curNode.j > 0) {
      let neighbor = new Node(curNode.i, curNode.j - 1, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        queue.push(neighbor);
      }
    }
    if (successorString.includes("R") && curNode.j < w - 1) {
      let neighbor = new Node(curNode.i, curNode.j + 1, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        queue.push(neighbor);
      }
    }
  }
  return {
    visited: visited,
    visitedArr: visitedArr,
  };
}

function dfs() {
  let stack = [];
  let startNode = new Node(0, Math.floor(w / 2), null, null);
  stack.push(startNode);
  let curNode = startNode;
  let visited = new Set();
  let visitedArr = [];
  visitedArr.push(startNode);
  visited.add(`${curNode.i},${curNode.j}`);
  while (
    !(curNode.i === h - 1 && curNode.j === Math.floor(w / 2)) &&
    stack.length > 0
  ) {
    curNode = stack.pop();
    let successorString = successorMatrix[curNode.i][curNode.j];
    let nodeString = `${curNode.i},${curNode.j}`;
    if (!visited.has(nodeString)) {
      visited.add(nodeString);
      visitedArr.push(curNode);
    }
    if (successorString.includes("U") && curNode.i > 0) {
      let neighbor = new Node(curNode.i - 1, curNode.j, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        stack.push(neighbor);
      }
    }
    if (successorString.includes("D") && curNode.i < h - 1) {
      let neighbor = new Node(curNode.i + 1, curNode.j, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        stack.push(neighbor);
      }
    }
    if (successorString.includes("L") && curNode.j > 0) {
      let neighbor = new Node(curNode.i, curNode.j - 1, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        stack.push(neighbor);
      }
    }
    if (successorString.includes("R") && curNode.j < w - 1) {
      let neighbor = new Node(curNode.i, curNode.j + 1, curNode);
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        stack.push(neighbor);
      }
    }
  }
  return {
    visited: visited,
    visitedArr: visitedArr,
  };
}

function aStar(distanceMatrix) {
  let pQueue = new PQueue();
  let startNode = new CostNode(0, Math.floor(w / 2), null, 0);
  const priority = 0 + distanceMatrix[0][Math.floor(w / 2)];
  pQueue.enqueue(startNode, priority);
  let curNode = startNode;
  let visited = new Set();
  let visitedArr = [];
  while (
    !(curNode.i === h - 1 && curNode.j === Math.floor(w / 2)) &&
    !pQueue.isEmpty()
  ) {
    curNode = pQueue.dequeue();
    let successorString = successorMatrix[curNode.i][curNode.j];
    let nodeString = `${curNode.i},${curNode.j}`;
    visited.add(nodeString);
    visitedArr.push(curNode);
    if (successorString.includes("U") && curNode.i > 0) {
      let neighbor = new CostNode(
        curNode.i - 1,
        curNode.j,
        curNode,
        curNode.cost + 1
      );
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        pQueue.enqueue(
          neighbor,
          neighbor.cost + distanceMatrix[neighbor.i][neighbor.j]
        );
      }
    }
    if (successorString.includes("D") && curNode.i < h - 1) {
      let neighbor = new CostNode(
        curNode.i + 1,
        curNode.j,
        curNode,
        curNode.cost + 1
      );
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        pQueue.enqueue(
          neighbor,
          neighbor.cost + distanceMatrix[neighbor.i][neighbor.j]
        );
      }
    }
    if (successorString.includes("L") && curNode.j > 0) {
      let neighbor = new CostNode(
        curNode.i,
        curNode.j - 1,
        curNode,
        curNode.cost + 1
      );
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        pQueue.enqueue(
          neighbor,
          neighbor.cost + distanceMatrix[neighbor.i][neighbor.j]
        );
      }
    }
    if (successorString.includes("R") && curNode.j < w - 1) {
      let neighbor = new CostNode(
        curNode.i,
        curNode.j + 1,
        curNode,
        curNode.cost + 1
      );
      let neighborString = `${neighbor.i},${neighbor.j}`;
      if (!visited.has(neighborString)) {
        pQueue.enqueue(
          neighbor,
          neighbor.cost + distanceMatrix[neighbor.i][neighbor.j]
        );
      }
    }
  }
  return {
    visited: visited,
    visitedArr: visitedArr,
  };
}

String.prototype.replaceAt = function (replacement, idx) {
  return (
    this.substring(0, idx) +
    replacement +
    this.substring(idx + replacement.length)
  );
};

// Q1
let maze = `+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                 |           |                             |     |                    |        |     |              |                          |           |        |
+  +--+--+--+--+  +  +  +--+--+  +--+--+--+--+--+--+  +--+--+  +  +  +--+--+  +--+--+  +--+--+  +  +  +  +  +--+--+  +  +--+--+--+--+--+--+  +--+  +--+  +--+  +--+  +
|        |        |  |           |        |           |     |  |  |     |  |  |     |     |     |  |     |        |  |     |        |     |  |     |  |     |     |  |
+--+--+--+  +--+  +  +--+--+--+--+  +--+  +  +  +--+--+  +  +  +  +--+  +  +  +  +  +--+  +  +--+  +--+--+--+--+  +  +--+  +  +--+--+  +  +  +  +--+  +--+  +--+  +  +
|           |     |  |     |        |        |  |     |  |  |  |     |     |     |  |        |     |     |        |     |     |        |  |  |  |        |        |  |
+  +--+--+--+--+--+  +  +  +  +--+--+--+--+--+--+  +  +  +  +  +--+  +  +--+--+--+  +  +--+--+  +--+  +--+  +--+--+--+--+--+  +  +--+--+  +  +  +--+--+  +--+--+--+  +
|                       |  |        |        |     |     |        |     |     |     |  |     |     |     |     |              |        |     |           |           |
+  +--+--+--+--+--+--+--+--+--+--+  +  +--+  +  +--+--+--+--+--+--+--+--+  +  +  +--+--+  +  +--+  +  +  +--+  +  +--+--+--+--+--+--+  +--+--+--+  +--+--+  +--+--+--+
|        |     |                 |     |  |  |  |     |                 |  |     |        |     |  |  |     |     |                 |           |  |        |        |
+--+--+  +--+  +  +--+--+--+--+  +--+  +  +  +  +--+  +  +--+--+--+--+  +  +--+--+  +--+--+--+  +  +--+--+  +--+--+  +--+--+--+--+  +--+--+--+  +  +  +--+--+  +--+  +
|     |        |              |     |     |  |        |     |     |     |     |     |     |  |  |     |           |        |                    |  |           |  |  |
+  +  +--+--+  +--+--+--+--+  +--+  +--+--+  +--+--+  +--+  +  +  +  +--+--+  +  +--+  +  +  +  +--+  +  +--+--+--+--+--+  +--+--+--+--+--+--+--+  +--+--+--+--+  +  +
|  |        |  |  |        |     |        |        |     |     |  |           |     |  |     |     |  |        |           |           |           |              |  |
+  +--+--+  +  +  +  +--+  +--+  +--+--+  +--+  +--+--+  +--+--+  +--+--+--+--+--+  +  +--+--+  +--+  +--+--+  +  +--+--+--+  +--+--+  +  +--+--+--+--+--+--+  +--+  +
|     |     |  |  |  |           |              |        |     |           |        |        |                 |  |        |        |     |              |     |     |
+--+--+  +  +  +  +  +  +--+--+--+--+--+--+--+--+  +--+--+  +--+--+--+--+  +  +--+--+--+--+  +--+--+--+--+--+--+  +  +--+  +--+--+  +--+--+  +  +--+--+  +  +  +  +--+
|        |  |  |  |  |     |                 |     |  |              |     |  |                 |              |        |  |     |  |        |     |  |     |  |     |
+  +  +--+--+  +  +  +--+  +  +--+--+--+--+  +  +--+  +  +--+  +--+  +  +--+  +--+  +  +--+--+--+  +--+--+--+  +--+--+--+  +  +  +  +--+--+--+--+  +  +--+  +--+--+  +
|  |  |        |  |     |  |  |  |           |  |           |     |  |  |           |  |           |     |  |           |     |  |                 |        |        |
+  +--+  +--+--+  +--+  +--+  +  +  +--+--+--+  +  +--+--+--+--+  +--+  +  +--+--+--+--+  +--+  +--+  +  +  +--+--+--+  +  +--+  +--+--+--+  +--+--+--+--+  +  +--+--+
|  |     |           |           |  |        |  |     |        |     |        |        |     |  |     |  |              |  |     |           |           |  |  |     |
+  +  +--+--+--+--+  +--+--+--+--+  +  +--+  +  +--+  +  +--+  +--+  +--+--+--+  +--+  +--+  +--+  +--+  +--+--+--+--+  +--+  +--+  +--+--+--+  +--+--+  +--+  +  +  +
|     |              |              |  |  |  |  |     |  |                 |     |        |  |     |     |           |        |              |     |        |  |  |  |
+  +--+--+  +--+  +--+  +--+--+--+--+  +  +  +  +--+  +  +--+  +--+--+  +--+  +--+--+--+  +  +  +--+  +--+  +--+--+  +--+--+--+  +--+--+--+--+--+  +--+--+  +  +  +  +
|        |     |  |     |              |  |  |     |  |     |  |     |  |     |        |     |  |     |     |        |     |        |           |        |     |  |  |
+--+--+  +  +  +--+  +--+  +--+--+--+--+  +  +--+  +--+--+  +  +  +  +--+  +  +  +--+  +--+--+  +  +--+  +--+  +--+--+  +  +  +--+--+  +--+--+  +--+  +  +--+--+  +  +
|  |     |  |  |     |     |        |     |     |  |        |  |  |  |     |  |     |     |     |  |        |  |        |     |        |     |     |  |  |        |  |
+  +  +--+  +  +  +--+  +--+--+  +  +  +--+  +--+  +  +--+--+--+  +  +  +--+  +--+  +--+  +  +--+  +  +--+--+  +  +--+--+--+--+  +--+  +  +  +--+  +--+  +  +--+--+  +
|     |     |  |  |     |        |     |     |     |              |  |     |  |     |     |     |     |        |        |     |     |  |  |     |        |     |  |  |
+  +--+  +--+  +  +  +--+  +--+--+--+--+  +  +  +--+--+--+--+  +--+  +--+  +--+  +--+  +--+--+  +--+--+  +--+--+  +--+--+  +  +--+  +--+  +--+  +--+--+--+--+  +  +  +
|     |  |     |  |        |              |  |              |  |        |     |  |  |           |     |        |  |        |        |     |  |  |     |           |  |
+--+  +  +  +--+  +--+--+  +  +--+--+--+--+  +--+--+--+--+  +--+  +--+--+--+  +  +  +--+--+--+--+  +  +--+--+  +  +  +--+--+--+--+--+  +--+  +  +  +  +  +--+--+--+  +
|  |  |  |     |           |  |     |     |              |     |  |           |  |     |           |           |  |  |           |     |     |     |  |        |     |
+  +  +--+--+  +--+--+--+--+  +  +  +  +  +--+  +--+--+--+--+  +  +  +--+--+--+  +  +--+  +  +--+--+--+--+--+  +  +  +  +--+--+  +  +--+  +  +--+--+  +--+--+  +  +--+
|     |        |           |     |     |     |  |           |     |           |     |     |  |        |     |  |  |     |     |  |  |  |  |  |        |        |     |
+  +--+  +--+--+  +--+--+  +--+--+--+--+--+  +--+  +--+  +--+--+  +--+--+--+  +--+  +  +--+--+  +--+  +  +--+  +  +--+--+  +--+  +  +  +  +  +  +--+  +  +--+--+--+  +
|  |     |     |  |     |                    |        |           |        |     |  |     |     |  |  |        |  |        |     |  |  |  |  |     |  |  |     |     |
+  +--+  +  +  +  +  +  +--+  +--+--+--+--+  +  +--+--+--+--+  +--+  +--+  +  +--+  +--+  +  +--+  +  +--+--+--+  +  +--+--+  +--+  +  +  +  +--+  +--+  +  +  +  +--+
|        |  |     |  |     |  |     |        |  |  |        |     |     |     |     |     |  |     |              |  |        |     |  |  |     |        |  |  |     |
+--+--+  +  +--+  +  +--+  +--+  +  +  +--+--+  +  +  +--+  +--+--+  +  +--+--+  +--+  +--+  +  +  +--+--+--+--+--+  +  +--+--+  +--+  +  +--+  +--+--+--+  +  +  +  +
|        |     |  |     |        |  |  |           |  |  |        |  |              |  |     |  |        |           |  |        |           |  |        |  |  |  |  |
+  +--+--+--+  +--+--+  +--+--+--+  +--+  +--+--+--+  +  +--+--+  +  +--+--+--+--+  +  +  +--+  +--+  +--+  +--+--+  +  +  +--+--+  +--+--+--+  +  +  +--+  +  +--+  +
|     |     |        |  |        |        |           |     |     |  |           |  |  |  |     |  |        |  |     |  |     |        |        |  |  |     |        |
+--+  +--+  +--+  +--+  +  +--+  +--+--+--+  +--+--+--+--+  +  +--+--+  +--+--+  +--+  +  +  +--+  +--+--+--+  +  +--+  +--+  +  +--+--+  +  +--+  +  +  +  +--+--+  +
|  |        |     |     |     |              |           |           |  |              |  |  |                 |  |        |  |  |        |  |     |  |  |  |     |  |
+  +--+--+  +  +--+  +--+--+  +--+--+  +--+--+  +--+--+  +--+--+--+  +  +  +--+--+--+--+  +  +--+  +  +--+--+--+  +  +--+  +  +--+  +--+--+--+  +--+  +  +--+  +  +--+
|           |           |     |     |  |        |     |  |        |     |  |           |  |     |  |  |        |  |     |  |     |     |        |  |  |  |     |     |
+  +--+--+--+--+--+--+--+  +--+  +  +--+  +--+--+--+  +  +  +--+  +--+--+  +  +--+--+  +  +--+  +--+  +  +--+  +  +--+  +  +--+  +  +  +  +--+--+  +  +  +  +--+--+  +
|  |  |                 |        |     |        |     |        |        |  |        |  |     |        |     |     |     |  |     |  |              |  |  |        |  |
+  +  +  +--+--+--+--+  +--+--+--+--+  +--+--+  +  +--+--+--+--+--+--+  +--+--+--+  +  +--+  +--+--+--+  +  +--+--+  +--+--+  +--+  +--+--+--+--+  +  +  +--+  +--+  +
|     |     |        |           |     |        |  |                 |  |           |                 |  |  |        |        |     |        |     |  |        |     |
+--+  +--+  +  +--+--+--+--+--+  +  +--+  +--+--+  +  +--+--+--+--+  +  +  +--+--+--+--+--+--+--+--+  +--+  +  +--+--+  +--+--+  +--+  +--+  +--+--+  +--+--+--+  +  +
|  |  |  |  |              |        |     |        |  |           |     |     |  |                 |        |        |        |     |     |     |           |     |  |
+  +  +  +  +--+--+--+  +  +  +--+--+  +--+--+--+  +  +  +--+--+  +--+--+--+  +  +  +--+--+--+--+  +--+--+--+--+--+  +--+--+  +--+--+  +  +--+  +  +--+--+--+  +--+--+
|  |     |  |        |  |        |     |           |     |        |              |              |                    |     |        |  |     |     |           |     |
+  +--+  +  +  +--+  +--+--+--+  +  +--+--+  +--+--+--+--+  +--+--+  +--+--+--+--+--+--+--+--+  +--+--+--+--+--+--+  +  +--+--+--+  +--+--+  +--+--+  +--+--+--+  +  +
|  |     |  |     |        |     |     |     |           |           |                          |     |  |           |  |        |     |     |     |  |     |     |  |
+  +  +--+  +--+  +--+--+  +--+--+--+  +  +--+  +--+--+  +--+--+--+--+  +--+--+--+--+--+--+--+--+  +  +  +  +--+--+--+  +  +--+  +--+  +  +--+  +  +  +  +  +  +--+  +
|     |     |  |  |     |  |        |  |     |        |           |     |     |           |        |  |     |              |        |  |     |  |  |     |  |  |     |
+--+--+  +  +  +  +--+  +  +  +  +--+  +--+  +--+--+  +--+--+--+  +  +--+  +  +  +--+--+  +  +--+--+  +--+  +--+--+--+--+--+  +--+--+  +  +  +  +  +--+--+  +  +  +  +
|        |  |  |     |  |     |     |     |        |        |        |     |        |     |        |     |                 |  |        |  |     |        |     |  |  |
+  +--+--+  +  +--+  +  +--+--+--+  +--+  +  +--+  +--+--+  +--+--+--+  +--+--+--+--+  +--+  +--+--+--+  +--+--+--+--+--+  +  +  +--+--+--+--+--+--+--+  +--+--+  +--+
|        |        |  |        |     |     |     |        |              |        |     |     |           |     |        |     |  |                       |     |     |
+  +--+  +--+--+--+  +--+--+  +  +--+  +--+--+  +--+  +--+--+--+--+--+--+--+--+  +  +--+  +--+  +--+--+  +  +  +  +--+  +--+--+  +  +  +--+--+--+--+--+  +  +--+--+  +
|  |     |                    |  |     |        |     |              |           |     |     |        |  |  |  |     |  |        |  |     |                 |     |  |
+  +  +--+  +--+--+--+--+--+--+  +  +--+--+  +--+  +  +  +--+  +--+--+  +  +--+  +--+  +--+  +--+--+  +--+  +  +--+  +  +  +--+--+--+--+  +--+--+--+--+  +--+  +  +  +
|  |     |  |        |        |  |        |  |  |  |  |  |  |  |     |  |     |  |     |     |     |  |     |        |  |  |              |     |     |  |     |  |  |
+  +--+  +  +  +--+--+  +--+  +  +--+--+  +  +  +  +--+  +  +  +  +  +  +--+  +--+  +--+  +--+--+  +  +  +--+--+--+--+  +  +  +  +--+--+--+  +  +  +  +--+  +--+  +  +
|     |  |  |        |  |           |     |     |     |     |  |  |  |  |     |     |              |  |  |     |        |  |  |  |           |     |     |     |     |
+--+--+  +  +--+--+  +  +--+--+--+  +  +--+--+  +--+  +--+  +  +  +  +  +  +--+  +--+  +--+--+--+--+  +  +--+  +  +--+--+  +--+  +  +--+--+--+--+--+--+  +--+  +--+--+
|        |  |        |           |  |        |     |        |     |     |     |  |     |           |  |     |  |  |     |     |           |                 |  |     |
+  +--+--+  +  +--+--+--+  +--+  +--+--+--+  +  +--+--+--+--+  +--+--+--+--+  +  +  +--+  +--+--+  +  +--+  +  +  +  +  +--+  +--+--+--+  +  +--+--+--+--+  +  +  +  +
|              |        |     |           |  |  |           |  |     |     |  |        |  |     |        |     |     |     |     |        |     |           |  |  |  |
+  +--+--+--+--+  +--+  +--+--+--+--+--+  +  +--+  +--+--+  +--+  +  +  +  +  +--+--+--+  +  +  +  +--+--+--+  +--+--+  +--+--+  +--+--+  +--+  +--+--+--+--+  +  +  +
|     |        |  |                    |        |  |     |        |     |     |           |  |  |  |        |  |  |     |     |        |  |     |              |  |  |
+--+--+  +--+  +  +--+--+--+  +--+--+  +--+--+  +  +  +  +  +--+--+--+--+--+--+  +--+--+--+  +  +--+  +--+  +  +  +  +--+  +  +--+--+  +--+  +--+  +--+--+  +--+  +  +
|        |        |     |     |     |        |     |  |  |  |                    |     |     |  |     |  |     |  |  |     |        |  |     |     |     |  |     |  |
+  +--+--+--+--+--+  +  +--+--+  +  +--+--+  +--+--+  +  +--+  +--+--+--+--+--+--+  +  +  +--+  +  +--+  +--+--+  +  +  +--+--+  +  +  +  +--+  +--+  +  +--+  +--+  +
|           |        |           |     |              |        |              |     |     |     |  |              |  |        |  |  |     |     |     |  |        |  |
+  +--+--+  +  +--+--+--+--+--+--+--+  +--+--+--+--+--+--+--+--+  +--+--+--+  +  +--+--+--+  +--+  +  +--+  +--+--+  +--+  +--+  +--+--+  +  +--+  +--+  +  +--+--+  +
|  |     |     |                    |  |              |           |        |     |           |     |     |  |     |     |  |     |        |        |     |  |  |     |
+  +  +  +--+--+--+--+  +--+  +--+--+  +  +--+--+--+  +  +--+--+--+--+--+  +--+--+  +--+--+  +  +--+  +  +--+  +  +--+  +  +  +  +  +--+--+--+--+  +  +--+  +  +  +--+
|  |  |              |     |  |        |  |     |     |  |                 |  |     |     |  |  |     |     |  |        |  |  |  |  |           |  |     |     |     |
+  +--+--+--+  +--+  +--+--+  +  +--+--+  +  +  +  +--+  +  +--+  +--+--+  +  +  +--+  +  +--+  +--+--+--+  +  +--+--+--+  +  +--+  +  +--+--+  +--+--+  +--+  +--+  +
|        |     |           |  |     |     |  |  |  |     |     |     |        |  |     |     |              |              |        |  |              |        |     |
+--+--+  +  +--+--+--+--+  +  +--+  +  +--+--+  +  +  +--+--+--+--+  +  +--+--+  +  +--+--+  +--+--+--+--+  +--+--+--+--+--+--+--+--+  +--+--+--+--+  +  +--+--+  +  +
|     |  |  |        |        |     |        |  |  |     |           |  |        |     |              |     |                    |  |  |        |     |     |     |  |
+  +--+  +  +  +--+  +--+--+  +  +--+--+--+  +  +  +--+  +  +--+--+--+  +  +--+  +--+  +  +--+--+--+  +  +--+--+  +--+--+--+--+  +  +  +  +--+  +  +--+--+--+  +--+--+
|        |  |     |     |     |           |  |  |     |  |  |        |  |  |        |  |  |           |        |     |              |  |     |  |  |           |     |
+  +--+--+  +--+  +--+  +--+--+--+  +  +--+  +  +  +--+  +  +  +--+  +--+  +--+--+--+  +  +--+--+--+  +--+--+  +--+  +--+--+--+--+--+  +--+  +  +  +  +  +--+  +  +  +
|  |  |        |     |           |  |           |     |  |  |     |        |           |  |        |  |     |     |        |              |  |  |  |  |  |     |  |  |
+  +  +  +  +--+--+  +--+--+--+  +--+--+--+--+--+--+  +  +  +--+  +--+--+--+  +--+--+--+  +  +--+  +--+  +  +--+  +--+--+  +  +--+--+--+--+  +  +  +--+  +--+--+  +  +
|  |     |  |        |     |                       |        |     |           |  |        |  |  |  |     |     |  |        |  |           |  |  |        |        |  |
+  +--+--+  +  +--+--+  +  +  +--+--+--+--+--+--+  +--+--+--+  +  +  +--+--+--+  +  +--+--+  +  +  +  +--+  +--+  +  +--+--+  +  +--+--+  +  +  +--+--+--+  +--+--+  +
|           |  |        |  |  |           |                    |  |  |           |     |        |        |  |     |  |        |        |  |  |              |        |
+  +--+--+--+  +  +--+--+  +  +  +--+--+  +--+--+--+--+--+--+  +--+  +  +--+--+  +--+  +  +--+--+--+--+--+  +  +--+  +  +--+--+--+--+  +  +  +--+--+--+--+--+  +--+--+
|  |     |     |  |     |  |  |        |                 |     |     |        |     |     |                 |  |     |           |     |  |  |              |  |     |
+  +  +  +  +--+  +  +--+  +--+--+--+  +--+--+--+--+--+  +--+--+  +--+--+--+  +  +--+--+--+  +--+--+--+--+--+  +  +--+--+--+  +--+  +--+  +  +  +  +--+--+--+  +  +  +
|  |  |     |        |     |        |     |           |           |           |           |                       |           |     |     |  |  |           |     |  |
+  +  +--+  +  +--+--+  +--+  +--+  +--+  +  +  +--+--+--+--+--+--+  +--+--+--+--+--+--+  +--+--+--+--+--+--+--+--+  +--+  +--+  +--+  +--+  +--+--+--+--+  +--+--+  +
|  |  |     |     |     |     |        |  |  |  |     |     |           |                 |  |                    |  |     |     |     |                          |  |
+--+  +--+--+--+  +  +--+  +--+  +--+--+  +--+  +  +  +  +  +  +--+--+--+  +--+--+--+--+  +  +  +--+--+--+--+--+  +  +--+--+  +--+  +--+  +--+--+--+--+--+--+--+  +  +
|     |           |  |     |     |     |     |     |  |  |  |  |           |     |     |  |  |     |           |  |  |           |        |  |           |        |  |
+  +--+  +--+--+--+  +  +--+  +--+  +  +--+  +--+--+  +  +  +  +  +--+--+  +  +  +--+  +  +  +--+  +  +--+--+  +  +  +  +--+--+--+--+--+  +  +  +--+--+  +--+  +--+  +
|  |           |     |     |        |     |        |     |     |        |  |  |     |        |     |  |  |     |     |     |           |     |     |  |     |     |  |
+  +  +--+--+--+  +  +--+  +--+--+--+  +--+--+--+  +--+--+--+--+--+--+  +--+  +--+  +--+--+  +  +--+  +  +  +  +--+--+  +--+  +--+--+  +--+--+--+  +  +--+  +--+--+  +
|     |           |     |  |        |        |     |                    |     |           |  |           |  |  |        |     |     |        |     |              |  |
+  +--+  +--+  +--+--+  +  +  +--+  +--+--+  +  +--+  +--+--+--+--+--+  +  +--+  +--+--+  +--+--+--+--+--+  +--+  +--+--+  +--+  +  +--+--+  +  +--+--+--+--+--+  +  +
|     |     |  |     |  |  |     |  |        |     |        |        |  |     |  |     |                 |        |     |        |        |     |           |        |
+  +--+--+  +--+  +  +--+  +--+  +  +  +--+--+--+  +--+  +  +  +--+  +  +--+  +--+  +  +--+--+--+--+--+  +--+--+  +  +--+--+  +--+--+--+  +--+--+  +--+--+  +--+--+--+
|  |        |     |  |     |     |  |           |     |  |        |  |  |     |     |                 |        |     |     |     |     |                 |           |
+  +  +--+--+  +--+  +  +--+--+--+  +--+--+  +--+--+  +--+--+--+--+  +  +  +--+  +--+--+--+--+--+--+  +--+--+  +--+--+  +  +--+--+  +  +--+--+--+--+--+--+--+--+--+  +
|  |              |                       |                          |  |        |                    |                 |           |                                |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+`;
let mazeMatrix = maze.split(["\n"]);

// Q2
let successorMatrix = [];
for (let i = 0; i < h; i++) {
  successorMatrix.push([]);
  for (let j = 0; j < w; j++) {
    let string = "";
    if (mazeMatrix[2 * i].charAt(3 * j + 1) === " ") {
      string += "U";
    }
    if (mazeMatrix[2 * i + 2].charAt(3 * j + 1) === " ") {
      string += "D";
    }
    if (mazeMatrix[2 * i + 1].charAt(3 * j) === " ") {
      string += "L";
    }
    if (mazeMatrix[2 * i + 1].charAt(3 * j + 3) === " ") {
      string += "R";
    }
    successorMatrix[i].push(string);
  }
}

// Q3:
let searchResults = bfs();
let actionSequence = [];
let node = searchResults.visitedArr[searchResults.visitedArr.length - 1];
while (node.parent !== null) {
  if (node.parent.i > node.i) {
    actionSequence.unshift("U");
  } else if (node.parent.i < node.i) {
    actionSequence.unshift("D");
  } else if (node.parent.j < node.j) {
    actionSequence.unshift("R");
  } else {
    actionSequence.unshift("L");
  }
  node = node.parent;
}

// Q4:
let mazeSolutionMatrix = mazeMatrix;
let i = 0;
let j = 27;
mazeSolutionMatrix[1] = mazeMatrix[1].replaceAt("@@", 3 * 27 + 1);
for (let k = 0; k < actionSequence.length; k++) {
  let value = actionSequence[k];
  if (value === "U") {
    i = i - 1;
    mazeSolutionMatrix[2 * i + 1] = mazeSolutionMatrix[2 * i + 1].replaceAt(
      "@@",
      3 * j + 1
    );
  }
  if (value === "D") {
    i = i + 1;
    mazeSolutionMatrix[2 * i + 1] = mazeSolutionMatrix[2 * i + 1].replaceAt(
      "@@",
      3 * j + 1
    );
  }
  if (value === "L") {
    j = j - 1;
    mazeSolutionMatrix[2 * i + 1] = mazeSolutionMatrix[2 * i + 1].replaceAt(
      "@@",
      3 * j + 1
    );
  }
  if (value === "R") {
    j = j + 1;
    mazeSolutionMatrix[2 * i + 1] = mazeSolutionMatrix[2 * i + 1].replaceAt(
      "@@",
      3 * j + 1
    );
  }
}

// Q5:
let bfsVisitedMatrix = [];
for (let i = 0; i < h; i++) {
  bfsVisitedMatrix.push([]);
  for (let j = 0; j < w; j++) {
    bfsVisitedMatrix[i].push(0);
  }
}
let bfsSearchResult = bfs();
bfsSearchResult.visitedArr.forEach((node) => {
  bfsVisitedMatrix[node.i][node.j] = 1;
});

// Q6:
let dfsSearchResult = dfs();
let dfsVisitedMatrix = [];
for (let i = 0; i < h; i++) {
  dfsVisitedMatrix.push([]);
  for (let j = 0; j < w; j++) {
    dfsVisitedMatrix[i].push(0);
  }
}
dfsSearchResult.visitedArr.forEach(
  (node) => (dfsVisitedMatrix[node.i][node.j] = 1)
);

// Q7:
let manhattanDistances = [];
for (let i = 0; i < h; i++) {
  manhattanDistances.push([]);
  for (let j = 0; j < w; j++) {
    let distance = Math.abs(i - (h - 1)) + Math.abs(j - Math.floor(w / 2));
    manhattanDistances[i].push(distance);
  }
}

// Q8:
let manhattanAStarSearchResult = aStar(manhattanDistances);
let mAStarVisitedMatrix = [];
for (let i = 0; i < h; i++) {
  mAStarVisitedMatrix.push([]);
  for (let j = 0; j < w; j++) {
    mAStarVisitedMatrix[i].push(0);
  }
}
manhattanAStarSearchResult.visitedArr.forEach(
  (node) => (mAStarVisitedMatrix[node.i][node.j] = 1)
);

// Q9:
let euclideanDistances = [];
for (let i = 0; i < h; i++) {
  euclideanDistances.push([]);
  for (let j = 0; j < w; j++) {
    let distance = Math.sqrt((i - (h - 1)) ** 2 + (j - Math.floor(w / 2)) ** 2);
    euclideanDistances[i].push(distance);
  }
}
let euclideanAStarSearch = aStar(euclideanDistances);
let eAStarVisitedMatrix = [];
for (let i = 0; i < h; i++) {
  eAStarVisitedMatrix.push([]);
  for (let j = 0; j < w; j++) {
    eAStarVisitedMatrix[i].push(0);
  }
}
for (let i = 0; i < euclideanAStarSearch.visitedArr.length; i++) {
  let node = euclideanAStarSearch.visitedArr[i];
  let nodei = node.i;
  let nodej = node.j;
  eAStarVisitedMatrix[nodei][nodej] = 1;
}

// Write answers to file
let answerText = `##a:6 ##id: vfli\n##1: ${maze}\n##2: ${successorMatrix.join(
  "\n"
)}\n##3: ${actionSequence.join("")}\n##4: \n${mazeSolutionMatrix.join(
  "\n"
)}\n##5: ${bfsVisitedMatrix.join("\n")}\n##6: ${dfsVisitedMatrix.join(
  "\n"
)}\n##7: ${manhattanDistances.join("\n")}\n##8: ${mAStarVisitedMatrix.join(
  "\n"
)}\n##9: ${eAStarVisitedMatrix.join("\n")}`;
fs.writeFile("answers.txt", answerText, (err) => {
  if (err) {
    console.error(err);
  } else {
  }
});
