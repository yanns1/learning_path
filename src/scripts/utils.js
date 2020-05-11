import {
    sortBy,
    compose,
    toLower,
    prop,
    unnest,
    eqProps,
    groupWith,
    toPairs,
    fromPairs,
    map
} from "ramda";

// ============================================================
// Sorting db items

// sortBySection :: [Object] -> [Object]
const sortBySection = sortBy(
    compose(
        toLower,
        prop("section")
    )
);

// sortByPriority :: [Object] -> [Object]
const sortByPriority = sortBy(prop("priority"));

// const itemsFromDbExample = {
//   "To Learn": [
//     {
//       section: "test",
//       priority: 3
//     },
//     {
//       section: "",
//       priority: 2
//     }
//     // ...
//   ]
// };

// sortItemsOfEntry :: [String, [Object]] -> [String, [Object]]
const sortItemsOfEntry = entry => {
    const newEntry = [...entry];
    const prevItems = newEntry[1];
    const groupIntoSubArrBySection = compose(
        groupWith(eqProps("section")),
        sortBySection
    );
    const sortItems = compose(
        unnest,
        map(sortByPriority),
        groupIntoSubArrBySection
    );
    newEntry[1] = sortItems(prevItems);

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

export { sortItemsFromDb, isFalsyArr }