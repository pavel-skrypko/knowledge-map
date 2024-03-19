import 'reactflow/dist/style.css';

import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  FitViewOptions,
  DefaultEdgeOptions,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from 'dagre';

import { CustomArticleNode } from './node';
import NodeInfo from '../NodeInfo';
import * as DATA from '../../data/graph.json';

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes = { articleNode: CustomArticleNode };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 320;
const nodeHeight = 240;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const GRAPH_DATA = JSON.parse(JSON.stringify(DATA));

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  GRAPH_DATA.nodes,
  GRAPH_DATA.links
);

const Graph = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState(null);

  const onNodeClick = (e, node) => {
    open();
    setModalData(node.data);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
          onlyRenderVisibleElements={false}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Cross} gap={10} size={1} />
        </ReactFlow>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <NodeInfo
          title={modalData?.title}
          description={modalData?.description}
          views={modalData?.views}
        />
      </Modal>
    </>
  );
};

export default Graph;
