import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    console.log("user------->",user)
    console.log("isAuth------->",isAuthenticated)

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={() => logout()}>
            Log Out
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default Login;
