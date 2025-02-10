import { useEffect } from 'react';
import { useLocation } from 'react-router';

import "preline/preline";
import { IStaticMethods } from "preline/preline";

import LandingPage from "./views/landingPage/landingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router";

import Dashboard from "./views/components/users/customer/dashboard";
import Profile from "./views/components/users/customer/profile/profile";
import Trips from "./views/components/users/customer/trips/trips";
import AdminSignUp from "./views/components/auth/adminSignUp";
import Users from "./views/components/users/admin/users/users";
import AdminDashboard from "./views/components/users/admin/dashboard/adminDashboard";
import AllFlights from "./views/components/users/admin/allFlights";
import Login from './views/components/auth/login';
import SignUp from './views/components/auth/signUp';
import PageTitle from './utils/pageTitle';
import Reservations from './views/components/users/customer/dashboard/reservations';
import NewReservation from './views/components/users/customer/dashboard/reservations/newReservation';


declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}


function useDarkMode() {
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = localStorage.getItem("theme") === "dark";

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);
}


function App() {
    
    useDarkMode();

    return (
        <Router>
            <AppContent/>
        </Router>
    );
}


function AppContent() {
    const location = useLocation();

    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [location.pathname]);

    return(
        <Routes>
            <Route path={"/:username/dashboard"} element={<Dashboard />} />
            <Route path={"/home"} element={<LandingPage />} />
            <Route path={"/"} element={<LandingPage />} />
            <Route path={"/auth/login"} element={<Login />} />
            <Route path={"/auth/signup"} element={<SignUp />} />
            <Route 
                path={"/:pid/dashboard"} 
                element={
                    <>
                        <PageTitle title={'Dashboard | Quick Analytics'} />
                        <Dashboard />
                    </>
                } 
            />
            <Route 
                path={"/:pid/reservations"} 
                element={
                    <>
                        <PageTitle title={'Reservation | Flight Booking Views'} />
                        <Reservations />
                    </>
                } 
            />
            <Route 
                path={"/reservations/new"} 
                element={
                    <>
                        <PageTitle title={'New Reservation'} />
                        <NewReservation />
                    </>
                } 
            />
            <Route path={"/:pid/profile"} element={<Profile />} />
            <Route path={"/:pid/my-trips"} element={<Trips />} />
            <Route path={"/admin-signup"} element={<AdminSignUp />}/>
            <Route path={"/bola-air/users"} element={<Users />}/>
            <Route path={"bola-air/admin/dashboard"} element={<AdminDashboard />}/>
            <Route path={"bola-air/all-flights"} element={<AllFlights />}/>
        </Routes>
    )
}

export default App;
