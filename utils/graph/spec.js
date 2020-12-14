import { Graph } from '.';

describe('Graph Utils', () => {
  const adam = { id: 'adam', name: 'Adam' };
  const betty = { id: 'betty', name: 'Betty' };
  const chris = { id: 'chris', name: 'Chris' };
  const dave = { id: 'dave', name: 'Dave' };
  const emma = { id: 'emma', name: 'Emma' };
  const fred = { id: 'fred', name: 'Fred' };

  test('can add nodes and edges to the graph without error, and graph should implement the iterable protocol', () => {
    const graph = new Graph();

    graph.addNode(adam);
    graph.addNode(betty);
    graph.addEdge(adam, betty);
    graph.addEdge(betty, chris);

    expect([...graph]).toEqual([
      [adam, [[betty, 1]]],
      [
        betty,
        [
          [adam, 1],
          [chris, 1],
        ],
      ],
      [chris, [[betty, 1]]],
    ]);
  });

  test('graph can have edges removed', () => {
    const graph = new Graph();

    graph.addNode(adam);
    graph.addNode(betty);
    graph.addEdge(adam, betty);
    graph.addEdge(betty, chris);

    expect([...graph]).toEqual([
      [adam, [[betty, 1]]],
      [
        betty,
        [
          [adam, 1],
          [chris, 1],
        ],
      ],
      [chris, [[betty, 1]]],
    ]);

    graph.removeEdge(adam, betty);

    expect([...graph]).toEqual([
      [adam, []],
      [betty, [[chris, 1]]],
      [chris, [[betty, 1]]],
    ]);
  });

  test('graph can have nodes removed', () => {
    const graph = new Graph();

    graph.addNode(adam);
    graph.addNode(betty);
    graph.addEdge(adam, betty);
    graph.addEdge(betty, chris);

    expect([...graph]).toEqual([
      [adam, [[betty, 1]]],
      [
        betty,
        [
          [adam, 1],
          [chris, 1],
        ],
      ],
      [chris, [[betty, 1]]],
    ]);

    graph.removeNode(betty);

    expect([...graph]).toEqual([
      [adam, []],
      [chris, []],
    ]);
  });

  test('graphs can be set to directed, meaning edges are one directional', () => {
    const graph = new Graph({ directed: true });

    graph.addNode(adam);
    graph.addNode(betty);
    graph.addEdge(adam, betty);
    graph.addEdge(betty, chris);

    expect([...graph]).toEqual([
      [adam, [[betty, 1]]],
      [betty, [[chris, 1]]],
      [chris, []],
    ]);
  });

  describe('graph can be instatiated with nodes and edges', () => {
    test('graph can be instatiated with nodes', () => {
      const graph = new Graph({ nodes: [adam, betty, chris] });

      expect([...graph]).toEqual([
        [adam, []],
        [betty, []],
        [chris, []],
      ]);
    });

    test('graph can be instatiated with edges undirected', () => {
      const graph = new Graph({
        edges: [
          [adam, betty, 1],
          [adam, chris, 2],
          [betty, dave, 3],
          [betty, emma, 1],
        ],
      });

      expect([...graph]).toEqual([
        [
          adam,
          [
            [betty, 1],
            [chris, 2],
          ],
        ],
        [
          betty,
          [
            [adam, 1],
            [dave, 3],
            [emma, 1],
          ],
        ],
        [chris, [[adam, 2]]],
        [dave, [[betty, 3]]],
        [emma, [[betty, 1]]],
      ]);
    });

    test('graph can be instatiated with edges while directed', () => {
      const graph = new Graph({
        directed: true,
        edges: [
          [adam, betty, 1],
          [adam, chris, 2],
          [betty, dave, 3],
          [betty, emma, 1],
        ],
      });

      expect([...graph]).toEqual([
        [
          adam,
          [
            [betty, 1],
            [chris, 2],
          ],
        ],
        [
          betty,
          [
            [dave, 3],
            [emma, 1],
          ],
        ],
        [chris, []],
        [dave, []],
        [emma, []],
      ]);
    });

    test('graph can be instatiated with both nodes and edges', () => {
      const graph = new Graph({
        nodes: [adam, betty, chris],
        edges: [
          [betty, chris, 3],
          [chris, dave, 1],
        ],
      });

      expect([...graph]).toEqual([
        [adam, []],
        [betty, [[chris, 3]]],
        [
          chris,
          [
            [betty, 3],
            [dave, 1],
          ],
        ],
        [dave, [[chris, 1]]],
      ]);
    });
  });

  test('depth first search', () => {
    const graph = new Graph({
      nodes: [adam, betty],
      edges: [
        [adam, betty],
        [adam, chris],
        [betty, dave],
        [betty, emma],
      ],
    });
    /**
     *      adam
     *     /    \
     * chris    betty
     *          /    \
     *        emma   dave
     */

    const actual = graph.dfs(adam);
    expect(actual).toEqual([adam, betty, dave, emma, chris]);
  });

  test('breadth first search', () => {
    const graph = new Graph({
      nodes: [adam, betty],
      edges: [
        [adam, betty],
        [adam, chris],
        [betty, dave],
        [betty, emma],
      ],
    });
    /**
     *      adam
     *     /    \
     * chris    betty
     *          /    \
     *        emma   dave
     */

    const actual = graph.bfs(adam);
    expect(actual).toEqual([adam, betty, chris, dave, emma]);
  });

  test('some nodes will not be reachable if there is no connecting edge', () => {
    const graph = new Graph({
      nodes: [adam, betty, emma],
      edges: [
        [adam, betty],
        [adam, chris],
        [betty, dave],
        [emma, fred],
      ],
    });
    /**
     *      adam      emma
     *     /    \         \
     * chris    betty     fred
     *              \
     *              dave
     */

    const actual = graph.bfs(adam);
    expect(actual).toEqual(expect.not.arrayContaining([emma, fred]));
  });
});
