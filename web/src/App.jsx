import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/protected.routes";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/header";
import Recipedetails from "./components/recipedetails";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  return (
    <Router>
      { isAuthenticated && <Header /> }
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/recipeDetails/" element={ <ProtectedRoute><Recipedetails /></ProtectedRoute> } />
      </Routes>
    </Router>
  );
};

export default App;
