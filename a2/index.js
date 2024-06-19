// Attribution: Young Wu and Ainur Ainabekova's CS540 P4 Solution 2020

const fs = require("node:fs");
const { parse } = require("csv-parse");

const K = 7;

try {
  const countryTimeSeriesMap = new Map();
  const processFile = async () => {
    const parser = fs
      .createReadStream(
        `API_FP.CPI.TOTL.ZG_DS2_en_csv_v2_402436/API_FP.CPI.TOTL.ZG_DS2_en_csv_v2_402436.csv`
      )
      .pipe(
        parse({
          delimiter: ",",
          trim: true,
          relax_quotes: true,
        })
      );
    for await (const record of parser) {
      // Work with each record
      [countryName, code, indName, indCode, ...timeSeries] = record;
      const numericTimeSeries = timeSeries
        .filter((value) => value !== "")
        .map((value) => Number(value));
      if (numericTimeSeries.length >= 2) {
        countryTimeSeriesMap.set(record[0], numericTimeSeries);
      }
    }
  };

  (async () => {
    await processFile();
    console.log("\nQ1:\n");
    console.log(countryTimeSeriesMap.get("Colombia").join(","));
    console.log(countryTimeSeriesMap.get("United States").join(","));
    const colombiaParameters = getParametersForTimeSeries(
      countryTimeSeriesMap.get("Colombia")
    );
    const usParameters = getParametersForTimeSeries(
      countryTimeSeriesMap.get("United States")
    );
    console.log("\nQ2:\n");
    logParameters(colombiaParameters);
    logParameters(usParameters);
    console.log("\nQ4:\n");
    let allParams = [];
    for (let [, value] of countryTimeSeriesMap) {
      allParams.push(getParametersForTimeSeries(value));
    }
    allParams = rescale(allParams);
    allParams.forEach((params) => logParameters(params));
    console.log("\nQ5:\n");
    const cluster = hierarchicalSingleLinkageCluster(allParams);
    console.log(cluster.join(","));
    console.log("\nQ6:\n");
    const completeCluster = hierarchicalCompleteLinkageCluster(allParams);
    console.log(completeCluster.join(","));
    console.log("\nQ7:\n");
    const kMeans = kMeansCluster(allParams);
    console.log(kMeans.cluster.join(","));
    console.log("\nQ8:\n");
    console.log(
      kMeans.centers
        .map((row) => row.map((value) => Number(value.toFixed(4))))
        .join("\n")
    );
    console.log("\nQ9:\n");
    console.log(
      getTotalDistortion(
        allParams,
        kMeans.cluster,
        kMeans.centers.map((row) =>
          row.map((value) => Number(value.toFixed(4)))
        )
      )
    );
  })();
} catch (err) {
  console.error(err);
}

// Q2
function getParametersForTimeSeries(series) {
  const mu =
    series.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / series.length;
  const sigma = Math.sqrt(
    (1 / (series.length - 1)) *
      series
        .map((value) => (value - mu) ** 2)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  );
  const sortedSeries = series.sort();
  const median =
    sortedSeries.length % 2 === 0
      ? (sortedSeries[sortedSeries.length / 2] +
          sortedSeries[sortedSeries.length / 2 - 1]) /
        2
      : sortedSeries[Math.floor(sortedSeries.length / 2)];
  const t = 0.5 * (series.length + 1);
  let numerator = 0;
  let denominator = 0;
  series.forEach((value, idx) => {
    numerator += (value - mu) * (idx + 1 - t);
    denominator += (idx + 1 - t) ** 2;
  });
  const beta = numerator / denominator;
  let rhoNumerator = 0;
  let rhoDenominator = 0;
  for (let i = 1; i < series.length; i++) {
    rhoNumerator += (series[i] - mu) * (series[i - 1] - mu);
    rhoDenominator += (series[i - 1] - mu) ** 2;
  }
  const rho = rhoNumerator / rhoDenominator;
  return [mu, sigma, median, beta, rho];
}

// Q5

function hierarchicalSingleLinkageCluster(paramsMatrix) {
  let distanceMatrix = getDistanceMatrix(paramsMatrix);

  let minDist;
  let a1;
  let a2;
  let c1 = 0;
  let c2 = 0;
  let cluster = paramsMatrix.map((val, idx) => idx);
  // Find minimum distance in distance matrix
  for (let i = 0; i < paramsMatrix.length - K; i++) {
    minDist = Number.MAX_VALUE;
    a1 = 0;
    a2 = 0;
    for (let j = 0; j < distanceMatrix.length; j++) {
      for (let k = j + 1; k < distanceMatrix.length; k++) {
        if (distanceMatrix[j][k] >= 0 && distanceMatrix[j][k] < minDist) {
          minDist = distanceMatrix[j][k];
          a1 = j;
          a2 = k;
        }
      }
    }
    // Resetting all distances in distance matrix to be minimum between the two clusters to be merged
    for (let j = 0; j < distanceMatrix.length; j++) {
      distanceMatrix[a1][j] = Math.min(
        distanceMatrix[a1][j],
        distanceMatrix[a2][j]
      );
      // Set all distances for cluster being "absorbed" to -1 so they do not get counted again
      distanceMatrix[a2][j] = -1;
      // Set diagonal opposite of distance matrix
      distanceMatrix[j][a1] = distanceMatrix[a1][j];
      distanceMatrix[j][a2] = distanceMatrix[a2][j];
      // Do not count this min distance again
      distanceMatrix[a1][a2] = -1;
      // Reset point on diagonal to 0
      distanceMatrix[j][j] = 0;
    }
    c1 = cluster[a1];
    c2 = cluster[a2];
    // Set all points in cluster being absorbed to absorbing cluster
    cluster.forEach((value, idx) => {
      if (value === c2) {
        cluster[idx] = c1;
      }
    });
  }
  // Assign unique cluster values to an int from 1 to K
  const clusterMap = new Map();
  let i = 0;
  for (let k = 0; k < cluster.length; k++) {
    if (clusterMap.has(cluster[k])) {
      cluster[k] = clusterMap.get(cluster[k]);
    } else {
      clusterMap.set(cluster[k], i);
      cluster[k] = i;
      i++;
    }
  }
  return cluster;
}

// Q6

function hierarchicalCompleteLinkageCluster(paramsMatrix) {
  let distanceMatrix = getDistanceMatrix(paramsMatrix);

  let minDist;
  let a1;
  let a2;
  let c1 = 0;
  let c2 = 0;
  let cluster = paramsMatrix.map((val, idx) => idx);
  // Find minimum distance in distance matrix
  for (let i = 0; i < paramsMatrix.length - K; i++) {
    minDist = Number.MAX_VALUE;
    a1 = 0;
    a2 = 0;
    for (let j = 0; j < distanceMatrix.length; j++) {
      let maxPointDist = Number.MIN_VALUE;
      for (let k = j + 1; k < distanceMatrix.length; k++) {
        if (distanceMatrix[j][k] >= 0 && distanceMatrix[j][k] < minDist) {
          minDist = distanceMatrix[j][k];
          a1 = j;
          a2 = k;
        }
      }
    }
    // Resetting all distances in distance matrix to be maximum between the two clusters to be merged
    for (let j = 0; j < distanceMatrix.length; j++) {
      distanceMatrix[a1][j] = Math.max(
        distanceMatrix[a1][j],
        distanceMatrix[a2][j]
      );
      // Set all distances for cluster being "absorbed" to -1 so they do not get counted again
      distanceMatrix[a2][j] = -1;
      // Set diagonal opposite of distance matrix
      distanceMatrix[j][a1] = distanceMatrix[a1][j];
      distanceMatrix[j][a2] = distanceMatrix[a2][j];
      // Do not count this min distance again
      distanceMatrix[a1][a2] = -1;
      // Reset point on diagonal to 0
      distanceMatrix[j][j] = 0;
    }
    c1 = cluster[a1];
    c2 = cluster[a2];
    // Set all points in cluster being absorbed to absorbing cluster
    cluster.forEach((value, idx) => {
      if (value === c2) {
        cluster[idx] = c1;
      }
    });
  }
  // Assign unique cluster values to an int from 1 to K
  const clusterMap = new Map();
  let i = 0;
  for (let k = 0; k < cluster.length; k++) {
    if (clusterMap.has(cluster[k])) {
      cluster[k] = clusterMap.get(cluster[k]);
    } else {
      clusterMap.set(cluster[k], i);
      cluster[k] = i;
      i++;
    }
  }
  return cluster;
}

function getDistanceMatrix(matrix) {
  let distanceMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    let rowOfZeroes = matrix.map((row) => 0);
    distanceMatrix.push(rowOfZeroes);
  }
  for (let i = 0; i < distanceMatrix.length; i++) {
    for (let j = i + 1; j < distanceMatrix.length; j++) {
      distanceMatrix[i][j] = getDistanceBetweenPointsAsArrays(
        matrix[i],
        matrix[j]
      );
      distanceMatrix[j][i] = distanceMatrix[i][j];
    }
  }
  return distanceMatrix;
}

function getDistanceBetweenPointsAsArrays(x, y) {
  if (x.length !== y.length) {
    throw new Error("Lengths of points as arrays do not match!");
  }
  let distance = 0;
  for (let i = 0; i < x.length; i++) {
    distance += (x[i] - y[i]) ** 2;
  }
  return Math.sqrt(distance);
}

function logParameters(params) {
  console.log(params.map((param) => Number(param.toFixed(4))).join(","));
}

//Q4

function rescale(paramMatrix) {
  let row = [];
  for (let i = 0; i < paramMatrix[0].length; i++) {
    row.push(i);
  }
  let scaled = [];
  for (let i = 0; i < paramMatrix.length; i++) {
    scaled.push(row);
  }

  let columnMins = new Array(paramMatrix[0].length);
  let columnMaxs = new Array(paramMatrix[0].length);
  for (let i = 0; i < row.length; i++) {
    columnMins[i] = paramMatrix[0][i];
    columnMaxs[i] = paramMatrix[0][i];
    for (let j = 0; j < scaled.length; j++) {
      columnMins[i] = Math.min(columnMins[i], paramMatrix[j][i]);
      columnMaxs[i] = Math.max(columnMaxs[i], paramMatrix[j][i]);
    }
  }
  for (let i = 0; i < scaled.length; i++) {
    const paramRow = paramMatrix[i];
    scaled[i] = columnMins.map(
      (min, idx) => (paramRow[idx] - min) / (columnMaxs[idx] - min)
    );
  }
  return scaled;
}

// Q7

function kMeansCluster(matrix) {
  let centerMatrix = [];
  let min;
  let a;
  // Cluster array represents which cluster center is closest to each point
  let cluster = new Array(matrix.length);
  // Count array represents number of points in each cluster
  let count = new Array(K);
  // Get random points
  for (let i = 0; i < K; i++) {
    let row = [];
    for (let j = 0; j < 5; j++) {
      const randomPoint = matrix[Math.floor(Math.random() * matrix.length)];
      row.push(randomPoint[j]);
    }
    console.log(row);
    centerMatrix.push(row);
  }
  // Max 10 iterations
  for (let iter = 0; iter < 10; iter++) {
    // Find closest point to a center
    for (let i = 0; i < matrix.length; i++) {
      min = Number.MAX_VALUE;
      for (let j = 0; j < K; j++) {
        const dist = getDistanceBetweenPointsAsArrays(
          matrix[i],
          centerMatrix[j]
        );
        if (dist < min) {
          min = dist;
          a = j;
        }
      }
      cluster[i] = a;
    }
    // Recalculate centers and count of points at each center
    for (let i = 0; i < K; i++) {
      count[i] = 0;
      // Reset all centers to 0
      for (let j = 0; j < 5; j++) {
        centerMatrix[i][j] = 0;
      }
    }
    for (let i = 0; i < matrix.length; i++) {
      // Increment the count for the cluster that the given point belongs to
      count[cluster[i]]++;
      // Add the sum of the point's dims to the center sum for calculation of new center
      for (let j = 0; j < 5; j++) {
        centerMatrix[cluster[i]][j] += matrix[i][j];
      }
    }
    // Divide each cluster center sum by the number of points in each cluster to get new center
    for (let i = 0; i < K; i++) {
      for (let j = 0; j < 5; j++) {
        centerMatrix[i][j] /= count[i];
      }
    }
  }
  return {
    cluster: cluster,
    centers: centerMatrix,
  };
}

function getTotalDistortion(matrix, clusters, centerMatrix) {
  let distortion = 0;
  matrix.forEach((point, idx) => {
    clusterCenter = centerMatrix[clusters[idx]];
    distance = getDistanceBetweenPointsAsArrays(point, clusterCenter);
    distortion += distance ** 2;
  });
  return distortion;
}
