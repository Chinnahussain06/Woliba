import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import "@fontsource/lato";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
