import React from "react";
import LandingPage from "./views/landingPage/landingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./views/components/users/dashboard/dashboard";
import Profile from "./views/components/users/profile/profile";
import ActivateUserAccount from "./views/components/auth/activateUserAccount";
import Trips from "./views/components/users/trips/trips";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/:username/dashboard"} element={<Dashboard />} />
        <Route path={"/home"} element={<LandingPage />} />
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/:username/profile"} element={<Profile />} />
        <Route path={"/:username/my-trips"} element={<Trips />} />

        <Route
          path={"/signup/activate-account"}
          element={<ActivateUserAccount />}
        />
      </Routes>
    </Router>
  );
}

export default App;
