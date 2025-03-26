import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
// import Auth from "./components/auth.jsx";
// import Dashboard from "./components/dashboard.jsx";
// import Recipedetails from "./components/recipe-details.jsx";
import Auth from "@/components/auth.jsx";
import Dashboard from "@/components/dashboard.jsx";
import Recipedetails from "@/components/recipe-details.jsx";


//middleware 
import ProtectedRoute from "./utils/protected.routes.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./utils/Header.jsx";

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
        <Route path="/recipeDetails/" element={ <ProtectedRoute><Recipedetails /></ProtectedRoute> } />
      </Routes>
    </Router>
  );
};

export default App;
