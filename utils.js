
const hasDuplicates = arr => new Set(arr).size !== arr.length;

const isInput = el => el.tagName === "INPUT"
const isSelect = el => el.tagName === "SELECT"
const getValue = el => el.value