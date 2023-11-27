import React from 'react';
import LandingPage from './views/landingPage/landingPage';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from './views/components/users/dashboard/dashboard';
import Profile from './views/components/users/profile/profile';
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
