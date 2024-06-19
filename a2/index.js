const fs = require("node:fs");
const { parse } = require("csv-parse");

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
      countryTimeSeriesMap.set(record[0], numericTimeSeries);
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
    logAllParameters(countryTimeSeriesMap);
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

// Q4
function logAllParameters(timeSeriesMap) {
  for (let [, value] of timeSeriesMap) {
    if (value.length > 1) {
      const params = getParametersForTimeSeries(value);
      logParameters(params);
    }
  }
}

function logParameters(params) {
  console.log(params.map((param) => Number(param.toFixed(4))).join(","));
}
