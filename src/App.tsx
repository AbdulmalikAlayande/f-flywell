import React from 'react';
import FetchCities from './learn/aviation_stack_api/fetchCities';
import LandingPage from './views/landingPage/landingPage';
import Dashboard from './views/components/dashboard/dashboard/dashboard';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from './views/components/dashboard/profile/profile';
function App() {
  return (
    <Router >
      <Routes>
        <Route path={'/username/dashboard'} element={<Dashboard/>}/>
        <Route path={'/home'} element={<LandingPage/>}/>
        <Route path={'/username/profile'} element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
