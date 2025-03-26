import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard";
import RecipeDetails from "./components/RecipeDetails";


//middleware 
import ProtectedRoute from "./utils/protected.routes.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./utils/Header";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  return (
    <Router>
      { isAuthenticated && <Header /> }
       <Header /> 
      <Routes>
        <Route path="/" element={ <Auth /> } />
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/recipeDetails/" element={ <ProtectedRoute><RecipeDetails /></ProtectedRoute> } />
      </Routes>
    </Router>
  );
};

export default App;
