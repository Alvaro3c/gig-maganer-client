import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GigDataProvider } from './contexts/GigDataContext';
import Home from './pages/Home';
import DashboardPreview from './pages/DashboardPreview';


const App = () => {
  return (
    <GigDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard-preview"
            element={<DashboardPreview
            />
            }
          />
        </Routes>
      </Router>
    </GigDataProvider>
  );
};

export default App;