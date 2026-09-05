import { createRoot } from 'react-dom/client';

// styles
import './index.css';

// project-imports
import App from './App';
import { ConfigProvider } from 'contexts/ConfigProvider';

const container = document.getElementById('root');
const root = createRoot(container!);

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

root.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);
