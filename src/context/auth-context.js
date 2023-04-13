import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({ /* We get back an object that also contains components */
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
}); /* Creates a context objectm, or anything else */

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
        if (storedUserLoggedInInfo === "1") {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn", "1");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }} >{props.children}</AuthContext.Provider>;
};

export default AuthContext;