import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import {AuthContextProvider} from "./context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/* We put these in here when we make the AuthContext greatER again */
  <AuthContextProvider><App /></AuthContextProvider>
);
