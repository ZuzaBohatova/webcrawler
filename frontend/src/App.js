import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Stack, Box, CssBaseline } from '@mui/material';
import Wizard from "./pages/wizard"
import RecordsView from "./pages/records-view"
import ExecutionView from "./pages/execution-view"


function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ textAlign: 'center' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="wizard" element={<WizardPage />} />
          <Route path="view" element={<ViewPage />} />
          <Route path="execution" element={<ExecutionPage />} />
        </Routes>
      </Box>
    </>
  );
}

function HomePage() {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", 
      position: "absolute", justifyContent: "center", alignItems: "center" }}
    >
      <div>
        <main>
          <h1>Welcome to our WebCrawler App!</h1>
          <p>Enter the Wizard below to get started.</p>
        </main>
        <nav>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <Button variant="contained" href="/wizard">Wizard</Button>
            <Button variant="contained" href="/view">View</Button>
          </Stack>
        </nav>
      </div>
    </Box>
  );
}

function WizardPage() {
  return (
    <>
      <main>
        <h1>Website Record Wizard</h1>
        <Wizard />
      </main>
      <nav>
        <Stack direction="row" spacing={3} m="1%" justifyContent="center" alignItems="center">
          <Button variant="contained" href="/">Home</Button>
          <Button variant="contained" href="/view">View</Button>
        </Stack>
      </nav>
    </>
  );
}

function ViewPage() {
  return (
    <>
      <main>
        <h1>Website Records View</h1>
        <RecordsView />
      </main>
      <nav>
      <Stack direction="row" spacing={3} m="1%" justifyContent="center" alignItems="center">
        <Button variant="contained" href="/">Home</Button>
        <Button variant="contained" href="/wizard">Wizard</Button>
      </Stack>
      </nav>
    </>
  );
}

function ExecutionPage() {
  return (
    <>
      <main>
        <h1>Execution View</h1>
        <ExecutionView />
      </main>
      <nav>
      <Stack direction="row" spacing={3} m="1%" justifyContent="center" alignItems="center">
        <Button variant="contained" href="/">Home</Button>
        <Button variant="contained" href="/wizard">Wizard</Button>
        <Button variant="contained" href="/view">View</Button>
      </Stack>
      </nav>
    </>
  );
}

export default App;
