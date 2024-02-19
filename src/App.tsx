import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import BasicTabs from "./components/Tabs/Tabs";

function App() {
  return (
    <MantineProvider>
      <BasicTabs />
    </MantineProvider>
  );
}

export default App;
