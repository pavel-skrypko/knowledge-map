import { IconEye } from '@tabler/icons-react';

import styles from './styles.module.css';

type INodeInfoProps = {
  title: string;
  description: string;
  views: number;
}

const NodeInfo = ({ title, description, views }: INodeInfoProps) => {
  return (
    <>
      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.description}>
        {description}
      </div>

      <div className={styles.views}>
        <IconEye /><span>{views}</span>
      </div>
    </>
  );
};

export default NodeInfo;
