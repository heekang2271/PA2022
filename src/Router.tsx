import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BERTPaper from './Routes/Project/BERTPaper';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BERTPaper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
