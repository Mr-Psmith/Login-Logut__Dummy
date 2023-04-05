import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
  if (storedUserLoggedInInfo === "1") {/* So if the above info shws us that the user already logged in, than we skip the login page 
    setIsLoggedIn(true);  /* But this creates an infinite loop, as every time we call a state settinmg function this comp reexecutes
  } */
  /* But we can do it like this: */
  useEffect(() => {  /* This will rerun only when the dependancies[] change  */
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true); 
    }
  }, []);/* and bec this has none, it will run only at the start of the app */

 

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1") /* First is an identifgier for the stuf itself, second is an identifier for the status of the stuff */
    setIsLoggedIn(true);                      /* We can do this in the function, bec, only executes when user clicks the given button */
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn"); /* and this is how we reset the logged in status */
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;