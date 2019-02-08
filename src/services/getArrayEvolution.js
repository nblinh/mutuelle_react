// [1,2,3] => [[1], [1,2], [1,2,3]]
const getArrayEvolution = array =>
    array
        .reduce((acc, answer) => [...acc, [...acc.slice(-1)[0], answer]], [[]])
        .slice(1);

export default getArrayEvolution;
