import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
  
import Home from "./Home/Home";
import TwitterAuthCallback from "./TwitterAuthCallback/TwitterAuthCallback";
import User from "./User/User";


const AppRoutes:React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/twitter-auth-callback" element={<TwitterAuthCallback />} />
                <Route path="/user" element={<User />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
