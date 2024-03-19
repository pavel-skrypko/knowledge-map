import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../Router';
import styles from './styles.module.css';

export default function MainNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [section, setSection] = useState(location.pathname);

  return (
    <div className={styles.navigationContainer}>
      <SegmentedControl
        value={section}
        onChange={(value) => {
          setSection(value);
          navigate(value);
        }}
        transitionTimingFunction="ease"
        fullWidth
        data={[
          { label: 'Flat view', value: ROUTES.FLAT },
          { label: '3D view', value: ROUTES.THREED },
        ]}
      />
      <div className={styles.clickNodeText}>
        Click on a node to open the full article
      </div>
    </div>
  );
}
