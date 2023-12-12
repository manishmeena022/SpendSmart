import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContext/AuthContext";
import { AccountContextProvider } from "./context/AccountContext/AccountContext";
import { TransactionContextProvider } from "./context/TransactionContext/TransactionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AccountContextProvider>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </AccountContextProvider>
  </AuthContextProvider>
);
