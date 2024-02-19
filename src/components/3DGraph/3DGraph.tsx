import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";
import { useCallback, useRef } from "react";

const myData = {
  nodes: [
    { id: "Node 1" },
    { id: "Node 2" },
    { id: "Node 3" },
    { id: "Node 4" },
    { id: "Node 5" },
    { id: "Node 6" },
  ],
  links: [
    { source: "Node 1", target: "Node 2" },
    { source: "Node 2", target: "Node 4" },
    { source: "Node 1", target: "Node 5" },
    { source: "Node 3", target: "Node 4" },
    { source: "Node 2", target: "Node 6" },
    { source: "Node 5", target: "Node 6" },
  ],
};

interface Links {
  source: {
    id: string;
  };
  target: {
    id: string;
  };
}

interface Nodes {
  x?: number;
  y?: number;
  z?: number;
}

export const ThreeDGraph = () => {
  const fgRef = useRef();

  const handleClick = useCallback(
    (node: Nodes) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio =
        1 +
        distance /
          Math.hypot(node.x as number, node.y as number, node.z as number);

      fgRef.current!.cameraPosition(
        {
          x: node.x! * distRatio,
          y: node.y! * distRatio,
          z: node.z! * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    [fgRef]
  );

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={myData}
      nodeLabel="id"
      nodeAutoColorBy="group"
      linkThreeObjectExtend={true}
      linkThreeObject={(link: Links) => {
        console.log(link);
        const sprite = new SpriteText(`${link.source.id} > ${link.target.id}`);
        sprite.color = "lightgrey";
        sprite.textHeight = 1.5;
        return sprite;
      }}
      linkPositionUpdate={(sprite, { start, end }) => {
        const middlePos = Object.assign(
          ...["x", "y", "z"].map((c) => ({
            [c]: start[c] + (end[c] - start[c]) / 2,
          }))
        );

        Object.assign(sprite.position, middlePos);
      }}
      onNodeClick={handleClick}
    />
  );
};
