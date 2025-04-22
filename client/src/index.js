import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import App from './App';
import Main from './Main';
import Notfound from './404';

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const activeChainId = ChainId.Polygon;

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      desiredChainId={activeChainId}
      chainRpc={{ [activeChainId]: process.env.REACT_APP_RPC_URL }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<App />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);