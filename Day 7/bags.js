import { createGraph } from '../utils/operators';

const bagMatch = /(no other)|\d+ [\w\s]*bags*/g;

export const parseRule = (str) => {
  const [name, bagsString] = str.split(' bags contain ');
  const bagRules = bagsString
    .match(bagMatch)
    .map((s) => s.replace(/bags*/g, '').trim());
  const canHold = bagRules.includes('no other')
    ? null
    : bagRules
        .map((str) => str.replace(/\sbags*$/, ''))
        .map((str) => {
          const [, ...groups] = /(\d+) ([\w\s]*)/g.exec(str);
          return groups;
        })
        .reduce((o, group) => {
          o[group[1]] = parseInt(group[0]);
          return o;
        }, {});

  return {
    name,
    canHold,
  };
};

export const createGraphOfBags = () => (observable) => {
  return observable.pipe(
    createGraph({
      toNode: (bag) => bag.name,
      toEdges: (bag) =>
        bag.canHold
          ? Object.entries(bag.canHold).map(([bagName, numOfBags]) => [
              bag.name,
              bagName,
              numOfBags,
            ])
          : [],
      directed: true,
    })
  );
};

export const searchGraphForNumberOfBagsThatHold = (bagName) => (graph) =>
  [...graph]
    .map(([node]) => node)
    .filter((node) => node !== bagName && graph.dfs(node).includes(bagName))
    .length;
