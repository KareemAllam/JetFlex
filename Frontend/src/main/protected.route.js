import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({component: Component,...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        auth.do(localStorage.getItem("Auth"))

        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } 

        else {

          return (
    
            <Redirect
              to={{
                pathname: "/Forbidden",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
