import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import ProtectedRoute from "./Components/protected.routes";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Components/header";


const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  return (
    <Router>
      { isAuthenticated && <Header /> }
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
      </Routes>
    </Router>
  );
};

export default App;
