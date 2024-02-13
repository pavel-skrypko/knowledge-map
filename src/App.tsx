import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { Graph } from './components';

function App() {
  return (
    <MantineProvider>
      <Graph />
    </MantineProvider>
  );
}

export default App;
