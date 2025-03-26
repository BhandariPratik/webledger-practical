import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Redirect on dashboard if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Auth0 Authentication
      </h1>
      <button
        disabled={isLoading}
        onClick={() => loginWithRedirect()}
        className=" cursor-pointer bg-blue-400 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-700"
      >
       Log In
      </button>
    </div>
  );
};

export default Auth;
