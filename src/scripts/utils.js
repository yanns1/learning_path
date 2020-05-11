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

const sortBySection = sortBy(
    compose(
        toLower,
        prop("section")
    )
);
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

const sortItemsFromDb = compose(
    fromPairs,
    map(sortItemsOfEntry),
    toPairs
);

export { sortItemsFromDb }