import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResults';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
    </Routes>
  );
};

export default AppRoutes;
