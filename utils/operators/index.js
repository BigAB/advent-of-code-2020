import path from 'path';
import { promisify } from 'util';
import { Observable } from 'rxjs';
import { filter, bufferWhen, reduce, share } from 'rxjs/operators';
import { eachLine } from 'line-reader';
import { Graph } from '../graph';

export const readlines = promisify(eachLine);

export const fromFileLines = (...filePathSegments) => {
  return new Observable((subscriber) => {
    let closed = false;
    readlines(path.join(...filePathSegments), (line) => {
      if (!closed) {
        subscriber.next(line);
      }
      return !closed;
    })
      .then(() => subscriber.complete())
      .catch((err) => subscriber.error(err));
    return () => {
      closed = true;
    };
  }).pipe(share());
};

export const takeEveryNth = (n) => filter((value, index) => index % n === 0);

export const bufferUntilBlank = () => (lines$) => {
  const blankLines$ = lines$.pipe(filter((line) => line === ''));
  return lines$.pipe(
    filter((line) => line !== ''),
    bufferWhen(() => blankLines$)
  );
};

const isValidEdge = (edge) =>
  Array.isArray(edge) &&
  (edge.length === 2 || (edge.length === 3 && typeof edge[2] === 'number'));

export const createGraph = ({
  toNode = (v) => v,
  toEdges = () => null,
  directed = false,
} = {}) => (observable) => {
  return observable.pipe(
    reduce((graph, item) => {
      const node = toNode(item);
      const edges = toEdges(item) || [];
      if (node != null) {
        graph.addNode(node);
      }
      edges.forEach((edge) => {
        if (isValidEdge(edge)) {
          graph.addEdge(...edge);
        }
      });
      return graph;
    }, new Graph({ directed }))
  );
};
