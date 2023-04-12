import React from "react";

const AuthContext = React.createContext({ /* We get back an object that also contains components */
    isLoggedIn: false
}); /* Creates a context objectm, or anything else */


export default AuthContext;