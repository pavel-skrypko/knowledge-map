import { Edge, Node } from "reactflow";

export const dataMockNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Node 1",
      title: "Society",
      views: 100,
    },
    type: "articleNode",
    position: { x: 5, y: 5 },
  },
  {
    id: "2",
    data: {
      label: "Node 2",
      title: "Infrastructure",
      views: 200,
    },
    type: "articleNode",
    position: { x: -35, y: 100 },
  },
  {
    id: "3",
    data: {
      label: "Node 3",
      title: "Infrastructure",
      views: 50,
    },
    type: "articleNode",
    position: { x: -175, y: 150 },
  },
  {
    id: "4",
    data: {
      label: "Node 4",
      title: "Society",
      views: 150,
    },
    type: "articleNode",
    position: { x: 200, y: 250 },
  },
  {
    id: "5",
    data: {
      label: "Node 5",
      title: "Society",
      views: 250,
    },
    type: "articleNode",
    position: { x: 125, y: 90 },
  },
];

export const dataMockEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e1-5", source: "1", target: "5" },
  { id: "e3-4", source: "3", target: "4" },
];
