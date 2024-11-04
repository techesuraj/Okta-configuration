// src/config.js

export default {
  oidc: {
    clientId: "0oahywcjlynFp7pCo1d7",
    issuer: "https://ciam-dev.primetherapeutics.com/oauth2/default",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    responseType: ["code"],
    responseMode: "query",
    tokenManager: {
      autoRenew: true,
      secure: true,
    },
  },
  widget: {
    issuer: "https://ciam-dev.primetherapeutics.com/oauth2/default",
    clientId: "0oahywcjlynFp7pCo1d7",
    redirectUri: window.location.origin + "/login/callback",
    scopes: ["openid", "profile", "email"],
    useClassicEngine: true,
    authParams: {
      pkce: true,
      responseType: ["code"],
      responseMode: "query",
    },
  },
};
