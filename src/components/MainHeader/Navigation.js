import React, {useContext} from "react";

import AuthContext from "../../context/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
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
                  <button onClick={ctx.onLogout}>Logout</button>{/* This is working bec of the the context object we have the onLogout value */}
                </li>
              )}
            </ul>
          </nav>
        );
};

export default Navigation;
