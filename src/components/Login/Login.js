import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = () => { /* A function in the useReducer for reducerFn */
  
}; 

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer();

  useEffect(() => {
    const identifier = setTimeout(() => { /* with this we only check after 500ms */
      setFormIsValid( 
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier); /* Sooooo this cleans the timeout after every run. And solves that the useEffect function settimeout part doesnt run in the background only when you stop typing for 500ms lecture 113. */
    };
  }, [enteredEmail, enteredPassword]);/* If we dont add depend. here, than it only runs once hence cant login. If we take out dependencies, than it runs every time, hence loop. So we add as dependencies what we are using az out sideeffect function */
                                                          /* And like this it reruns if the given stuff changes */
      /* There was also setFormIsValid, but we could omit that, bec those state updating functions by default are insured by React to never change. */
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    /* setFormIsValid( ORIGINALe
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );*/
  }; 

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    /* setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    ); */
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
