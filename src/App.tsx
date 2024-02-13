import { useCallback, useState } from "react";
import "./App.css";
import ReactFlow, {
  Controls,
  MiniMap,
  addEdge,
  OnConnect,
  Background,
  BackgroundVariant,
  Edge,
  FitViewOptions,
  DefaultEdgeOptions,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Node 1",
    },
    position: { x: 5, y: 5 },
  },
  {
    id: "2",
    data: {
      label: "Node 2",
    },
    position: { x: -35, y: 100 },
  },
  {
    id: "3",
    data: {
      label: "Node 3",
    },
    position: { x: -175, y: 150 },
  },
  {
    id: "4",
    data: {
      label: "Node 4",
    },
    position: { x: 200, y: 150 },
  },
  {
    id: "5",
    data: {
      label: "Node 5",
    },
    position: { x: 125, y: 90 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e1-5", source: "1", target: "5" },
  { id: "e3-4", source: "3", target: "4" },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <>
      <div style={{ width: "70vw", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

export default App;
