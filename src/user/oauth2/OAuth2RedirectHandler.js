import React from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Navigate, useLocation } from "react-router-dom";

function OAuth2RedirectHandler() {
  const location = useLocation();

  function getUrlParameter(name) {
    name = name.replace(/\[/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return (
      <Navigate
        to={{
          pathname: window.location.href = "/login",
          state: { from: location },
        }}
      />
    );
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: {
            from: location,
            error: error,
          },
        }}
      />
    );
  }
}

export default OAuth2RedirectHandler;
