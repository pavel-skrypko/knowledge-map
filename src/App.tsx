import '@mantine/core/styles.css';
import './styles/index.css';

import { MantineProvider } from "@mantine/core";
import { Router } from './Router';

function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  );
}

export default App;
