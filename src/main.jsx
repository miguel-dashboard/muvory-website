import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Experience from './Experience.jsx';
import Services from './Services.jsx';
import Sectors from './Sectors.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {(() => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      if (path === '/experience') return <Experience />;
      if (path === '/sectores') return <Sectors />;
      if (path.startsWith('/sectores/')) return <Sectors slug={decodeURIComponent(path.slice('/sectores/'.length))} />;
      if (path === '/servicios') return <Services />;
      if (path.startsWith('/servicios/')) return <Services slug={decodeURIComponent(path.slice('/servicios/'.length))} />;
      return <App />;
    })()}
  </React.StrictMode>
);
