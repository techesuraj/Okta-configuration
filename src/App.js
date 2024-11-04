// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import config from "./config";
import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
const oktaAuth = new OktaAuth({
  issuer: "https://ciam-dev.primetherapeutics.com/oauth2/default",
  clientId: "0oahywcjlynFp7pCo1d7",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  tokenManager: {
    autoRenew: true,
    secure: true,
    storage: "localStorage",
  },
  devMode: true,
});
oktaAuth.options.devMode = true; // Enable detailed logging
const App = () => {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.href = originalUri || "/dashboard";
  };

  const onAuthRequired = () => {
    window.location.href = "/login";
  };

  return (
    <Router>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={onAuthRequired}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/callback"
            element={<LoginCallback pkce={true} />}
          />
          <Route
            path="/dashboard"
            element={
              <SecureRoute>
                <Dashboard />
              </SecureRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Security>
    </Router>
  );
};

export default App;
