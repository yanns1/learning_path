
const hasDuplicates = arr => new Set(arr).size !== arr.length;
const areArraysEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);
const isInput = el => el.tagName === "INPUT"
const isSelect = el => el.tagName === "SELECT"
const getValue = el => el.value
const strToInt = str => parseInt(str, 10)
// If can't convert str, returns NaN. Use isNan() for checking that