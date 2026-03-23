import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { worker } from '@mocks/browser.ts';
import { initMock } from '@mocks/db.ts';

const startApp = async () => {
  await worker.start();
  initMock();
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

startApp();
