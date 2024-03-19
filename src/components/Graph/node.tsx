import styles from './node.module.css';

import { Handle, NodeProps, Position } from 'reactflow';
import {  IconEye } from '@tabler/icons-react';

type NodeData = {
  title: string;
  views: number;
};

export const CustomArticleNode = ({
  data,
  isConnectable,
  ...props
}: NodeProps<NodeData>) => {
  return (
    <div className={styles.nodeContainer}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <div className={styles.nodeTitleContainer}>
        <div className={styles.nodeTitle}>
          {data.title}
        </div>
      </div>

      <div className={styles.nodeContentContainer}>
        <div className={styles.viewsContainer}>
          <IconEye />{data.views}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};
