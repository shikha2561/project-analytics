import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
