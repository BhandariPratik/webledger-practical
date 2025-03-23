import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import ProtectedRoute from "./Components/protected.routes";

const App = () => {
  // const { user,isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  // console.log("isAuthneticated----->",isAuthenticated)
  // console.log("user------>",user)

  // React.useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     loginWithRedirect();
  //   }
  // }, []);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashbaord" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
