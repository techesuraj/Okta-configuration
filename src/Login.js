// src/Login.js

import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OktaSignIn from "@okta/okta-signin-widget";
import OktaAuth from "@okta/okta-auth-js";
import config from "./config";
import "@okta/okta-signin-widget/css/okta-sign-in.min.css";
import { useOktaAuth } from "@okta/okta-react";

const Login = () => {
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const widgetRef = useRef();

  useEffect(() => {
    const widget = new OktaSignIn({
      ...config.widget,
      el: widgetRef.current,
      authClient: oktaAuth,
      useInteractionCodeFlow: true,
    });

    widget.showSignInToGetTokens({
      success: (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
        navigate("/dashboard");
      },
      error: (err) => {
        console.error("Error logging in:", err);
      },
    });

    return () => widget.remove();
  }, [oktaAuth, navigate]);

  return <div ref={widgetRef} />;
};

export default Login;
