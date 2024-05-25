const fs = require('node:fs');

const bigramRow = [
    ' ',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]

try {
    let text = fs.readFileSync('script.txt', 'utf8');
    text = text.toLowerCase().replaceAll(/\s/g, ' ');
    const regex = /[a-z\s]/;
    const testText = 'ab  c      d ef g  ';
    text = text.split('')
        .filter(text => text.match(regex))
        .filter((text, index, arr) => !(text === ' ' && arr[index + 1] === ' '))
        .join('');
    console.log('Unigram: ' + getUnigramProbabilities(text));
    console.log('Bigram: ' + getBigramProbabilities(text));
    console.log('Laplace Bigram: ' + getLaplaceBigramProbabilities(text));
} catch (err) {
    console.error(err);
}

function getUnigramProbabilities(text) {
    let unigramArr = new Array(27);
    let sum = 0;
    for (let i = 0; i < 27; i++) {
        const iCharCount = getCountForStringInText(text, bigramRow[i]);
        let unigramProb = iCharCount / text.length;
        if (unigramProb > 0 && unigramProb < 0.0001) {
            unigramProb = 0.0001;
        }
        unigramProb = unigramProb.toFixed(4);
        sum += Number(unigramProb);
        unigramArr[i] = unigramProb;
    }
    const diff = 1 - sum;
    unigramArr[26] = Number((Number(unigramArr[26]) + diff).toFixed(4));
    const finalSum = unigramArr.reduce((partialSum, i) => partialSum + Number(i), 0);
    if(finalSum.toFixed(4) !== '1.0000') {
        throw Error('Sum is not 1!');
    }
    return unigramArr.join(',');
}

function getLaplaceBigramProbabilities(text) {
    let res = '';
    let bigramMatrix = new Array(27);
    for (let i = 0; i < 27; i++) {
        bigramMatrix[i] = new Array(27);
    }
    for (let i = 0; i < 27; i++) {
        let sum = 0;
        for (let j = 0; j < 27; j++) {
            const iChar = bigramRow[i];
            const jChar = bigramRow[j];
            const bigram = iChar + jChar;
            const bigramCount = getCountForStringInText(text, bigram);
            const iCharCount = getCountForStringInText(text, iChar);
            let bigramProb = (bigramCount + 1) / (iCharCount + 27);
            if (bigramProb > 0 && bigramProb < 0.0001) {
                bigramProb = 0.0001;
            }
            bigramProb = bigramProb.toFixed(4);
            sum += Number(bigramProb);
            bigramMatrix[i][j] = bigramProb;
        }
        const diff = 1 - sum;
        bigramMatrix[i][26] = Number((Number(bigramMatrix[i][26]) + diff).toFixed(4));
        const finalSum = bigramMatrix[i].reduce((partialSum, i) => partialSum + Number(i), 0);
        if (finalSum.toFixed(4) !== '1.0000') {
            throw Error('Sum is not 1!');
        }
        res += bigramMatrix[i].join(',');
        if (i !== 26) {
            res += '\n';
        }
    }
    return res;
}

function getBigramProbabilities(text) {
    let res = '';
    let bigramMatrix = new Array(27);
    for (let i = 0; i < 27; i++) {
        bigramMatrix[i] = new Array(27);
    }
    for (let i = 0; i < 27; i++) {
        let sum = 0;
        for (let j = 0; j < 27; j++) {
            const iChar = bigramRow[i];
            const jChar = bigramRow[j];
            const bigram = iChar + jChar;
            const bigramCount = getCountForStringInText(text, bigram);
            const iCharCount = getCountForStringInText(text, iChar);
            let bigramProb = bigramCount / iCharCount;
            if (bigramProb > 0 && bigramProb < 0.0001) {
                bigramProb = 0.0001;
            }
            bigramProb = bigramProb.toFixed(4);
            sum += Number(bigramProb);
            bigramMatrix[i][j] = bigramProb;
        }
        const diff = 1 - sum;
        bigramMatrix[i][26] = Number((Number(bigramMatrix[i][26]) + diff).toFixed(4));
        const finalSum = bigramMatrix[i].reduce((partialSum, i) => partialSum + Number(i), 0);
        if (finalSum.toFixed(4) !== '1.0000') {
            throw Error('Sum is not 1!');
        }
        res += bigramMatrix[i].join(',');
        if (i !== 26) {
            res += '\n';
        }
    }
    return res;
}

function getCountForStringInText(text, char) {
    const regex = new RegExp(`${char}`, "g");
    return (text.match(regex) || []).length;
}
