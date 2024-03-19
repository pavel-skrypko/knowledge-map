import { useCallback, useMemo, useRef, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

import * as DATA from '../../data/graph.json';
import NodeInfo from '../NodeInfo';

interface Nodes {
  x?: number;
  y?: number;
  z?: number;
}

export const ThreeDGraph = () => {
  const fgRef = useRef();

  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState(null);

  const GRAPH_DATA = useMemo(() => JSON.parse(JSON.stringify(DATA)), []);

  const handleClick = useCallback(
    (node: Nodes) => {
      open();
      // @ts-ignore
      setModalData(node.data);
      // Aim at node from outside it
      const distance = 40;
      const distRatio =
        1 +
        distance /
          Math.hypot(node.x as number, node.y as number, node.z as number);

      if (fgRef && fgRef.current) {
        // @ts-ignore
        fgRef.current.cameraPosition(
          {
            x: node.x! * distRatio,
            y: node.y! * distRatio,
            z: node.z! * distRatio,
          }, // new position
          node, // lookAt ({ x, y, z })
          3000 // ms transition duration
        );
      }
    },
    [fgRef]
  );

  return (
    <>
      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes: GRAPH_DATA.nodes, links: GRAPH_DATA.links }}
        backgroundColor='white'
        linkAutoColorBy='id'
        linkWidth={1}
        // nodeAutoColorBy="group"
        nodeThreeObjectExtend
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.data.title);
          sprite.color = "black";
          sprite.textHeight = 1.5;
          return sprite;
        }}
        linkPositionUpdate={(sprite, { start, end }) => {
          const middlePos = Object.assign(
            // @ts-ignore
            ...["x", "y", "z"].map((c) => ({
              [c]: start[c] + (end[c] - start[c]) / 2,
            }))
          );

          Object.assign(sprite.position, middlePos);
        }}
        onNodeClick={handleClick}
      />

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
