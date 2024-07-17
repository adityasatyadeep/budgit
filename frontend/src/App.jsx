import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout';
import BudgetPage from './pages/BudgetPage';
import FormPage from './pages/FormPage';
import HistoryPage from './pages/HistoryPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}> 
      <Route index element={<BudgetPage />} />
      <Route path='/form' element={<FormPage />} />
      <Route path='/history' element={<HistoryPage />} />

      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
