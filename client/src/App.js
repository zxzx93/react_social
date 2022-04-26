import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, //replace Redirect with Navigate
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        {/* <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        /> */}
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
