import React from "react";

import AuthContext from "../../context/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {/* As an argument you get the context data, so the data which is inthe context */
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && ( /* and here for example we can overwrite props to ctxfrom now on */
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
