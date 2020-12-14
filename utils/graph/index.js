import { sum } from '../common';

export class Graph {
  [Symbol.iterator]() {
    return this.nodeEdgeMap.entries();
  }

  constructor({ directed = false, nodes = [], edges = [] } = {}) {
    this.directed = directed;
    this.nodeEdgeMap = new Map();
    nodes.forEach((node) => this.addNode(node));
    edges.forEach((edge) => this.addEdge(...edge));
  }

  addNode(node) {
    if (!this.nodeEdgeMap.has(node)) {
      this.nodeEdgeMap.set(node, []);
    }
  }
  addEdge(sourceNode, destinationNode, weight = 1) {
    if (!this.nodeEdgeMap.has(sourceNode)) {
      this.nodeEdgeMap.set(sourceNode, []);
    }
    if (!this.nodeEdgeMap.has(destinationNode)) {
      this.nodeEdgeMap.set(destinationNode, []);
    }
    this.nodeEdgeMap.get(sourceNode).push([destinationNode, weight]);
    if (!this.directed) {
      this.nodeEdgeMap.get(destinationNode).push([sourceNode, weight]);
    }
  }
  removeNode(node) {
    this.nodeEdgeMap
      .get(node)
      .forEach(([edgeNode]) => this.removeEdge(node, edgeNode));
    this.nodeEdgeMap.delete(node);
  }
  removeEdge(sourceNode, destinationNode) {
    this.nodeEdgeMap.set(
      sourceNode,
      this.nodeEdgeMap
        .get(sourceNode)
        .filter(([node]) => node !== destinationNode)
    );
    if (!this.directed) {
      this.nodeEdgeMap.set(
        destinationNode,
        this.nodeEdgeMap
          .get(destinationNode)
          .filter(([node]) => node !== sourceNode)
      );
    }
  }

  bfs(startingNode) {
    const queue = [startingNode];
    const result = [];
    const visited = new Set([startingNode]);

    let currentNode;
    while (queue.length) {
      currentNode = queue.shift();
      result.push(currentNode);
      this.nodeEdgeMap.get(currentNode).forEach(([edgeNode]) => {
        if (!visited.has(edgeNode)) {
          visited.add(edgeNode);
          queue.push(edgeNode);
        }
      });
    }
    return result;
  }

  dfs(startingNode) {
    const result = [];
    const visited = new Set();
    const nodeEdgeMap = this.nodeEdgeMap;
    (function dfs(node) {
      if (!node) return null;
      visited.add(node);
      result.push(node);
      nodeEdgeMap.get(node).forEach(([edgeNode]) => {
        if (!visited.has(edgeNode)) {
          return dfs(edgeNode);
        }
      });
    })(startingNode);
    return result;
  }

  recursivelyCountWeightCumulative(startingNode, multiplier = 1) {
    const edges = this.nodeEdgeMap.get(startingNode);
    const nodeEdgeWeight = multiplier * sum(...edges.map(([, w]) => w));
    const childNodesEdgeWeights = edges.reduce((t, [n, weight]) => {
      return t + this.recursivelyCountWeightCumulative(n, multiplier * weight);
    }, 0);
    return nodeEdgeWeight + childNodesEdgeWeights;
  }
}
