import React, {useState} from "react";
import Login from "../components/Login/Login";

const AuthContext = React.createContext({ /* We get back an object that also contains components */
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
}); /* Creates a context objectm, or anything else */

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logoutHandler = () => {
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        setIsLoggedIn(true);
    };

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }} >{props.children}</AuthContext.Provider>;
};

export default AuthContext;