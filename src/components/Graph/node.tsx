import { Handle, NodeProps, Position } from 'reactflow';
 
type NodeData = {
  title: string;
  views: number;
};
 
export const CustomArticleNode = ({ data, isConnectable }: NodeProps<NodeData>) => {
  return (
    <div style={{ border: '1px dotted #eaeaea', padding: '0 10px' }}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>{data.title}</div>
      <div>Views: {data.views}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}
