import {
    sortBy,
    compose,
    prop,
    toPairs,
    fromPairs,
    map
} from "ramda";

// ============================================================
// Sorting db items

// sortByPriority :: [Object] -> [Object]
const sortByPriority = sortBy(prop("priority"));

// const itemsFromDbExample = {
//   "To Learn": [
//     {
//       priority: 3
//       ...
//     },
//     {
//       priority: 2,
//       ...
//     }
//     ...
//   ]
// };

// sortItemsOfEntry :: [String, [Object]] -> [String, [Object]]
const sortItemsOfEntry = entry => {
    const newEntry = [...entry];
    const prevItems = newEntry[1];
    newEntry[1] = sortByPriority(prevItems);

    return newEntry;
};

// sortItemsFromDb :: Object -> Object
const sortItemsFromDb = compose(
    fromPairs,
    map(sortItemsOfEntry),
    toPairs
);

// ============================================================
// Other utils

// isFalsyArr :: [a] -> Boolean
const isFalsyArr = arr => !(Array.isArray(arr) && arr.length);

const strToInt = str => parseInt(str, 10);

export { sortItemsFromDb, isFalsyArr, strToInt }