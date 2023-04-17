import React, { useState, useEffect, useReducer, useContext, useRef, } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../Input/Input";

/* This is the useReducer()'s reducerFn taken out here  */
const emailReducer = (state, action) => {
  /* A function in the useReducer for reducerFn. Can be created outside of the comp function, we can do this bec we wont need any data here from the Compfunction, react will use automaticlly everything when it is executed */
  if (action.type === "USER_INPUT") {
    /* what we dispaches as action will be an object because we set that before-below where it was "up to us" */
    return {
      value: action.val,
      isValid: action.val.includes("@")
    }; /* action.val-that's the payload we appended to our action */
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@")
    }; /* we use here the last state snapshot "which is garanteed that its really the last one" */
  }
  return {
    value: "",
    isValid: false
  }; /* we return a new state here in the {}, and we put this in the useReducer as well below */
}; /* uses the last state snapshot, and the action  */

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  /* const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  }); /* our initial state here is the {} -therefore we can use the emailState in our code below */

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    valuse: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  /*Our effect-the password lenght checker one- reexecutes even after the password reached its correct length. We can reach that it doesnt by: */
  /* Using object destructuring-we are pulling out certain properties of objects */
  /* const { isValid } = emailState; */ /* and we are storing it in a new constant of the same name */
  /* here we would pull out the same named property from passwordState, and becouse of this we instead are using a variation of the destructuring */
  const { isValid: emailIsValid } =
    emailState; /* so we pull out isValid, and we are storing it in a constant named emailIsValid */
  const { isValid: passwordIsValid } =
    passwordState; /* This is called not a value, but an ALIAS-ASIGNMENT */
  /* By pulling out these values, and not using the whole, we basically solved that after the check reacht the valid status it wont check */

  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  useEffect(
    () => {
      const identifier = setTimeout(() => {
        /* with this we only check after 500ms */
        setFormIsValid(
          /* emailState.isValid && passwordState.isValid */
          emailIsValid && passwordIsValid /* and we are using here the two pulled out alias-assigned values from above of the useEffect */
        );
      }, 500);

      return () => {
        clearTimeout(
          identifier); /* Sooooo this cleans the timeout after every run. And solves that the useEffect function settimeout part doesnt run in the background only when you stop typing for 500ms lecture 113. */
      }; /* and we are using here the two pulled out alias-assigned values from above of the useEffect */
    },
    /* [emailState, passwordState]) */ [emailIsValid, passwordIsValid]
  ); /* If we dont add depend. here, than it only runs once hence cant login. If we take out dependencies, than it runs every time, hence loop. So we add as dependencies what we are using az out sideeffect function */
  /* And like this it reruns if the given stuff changes */
  /* There was also setFormIsValid, but we could omit that, bec those state updating functions by default are insured by React to never change.*/
  const emailChangeHandler = (event) => {
    /* setEnteredEmail(event.target.value); */
    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    }); /* Again it's "up to us",- whats inside the (), it can be a simple string a number or an object like here- but "it is convention". Why, why not, etc, who know max teaches everything very well, except when suddenly he doesn't tell shit, like here */

    /* setFormIsValid( /* ORIGINALe
      event.target.value.includes('@') && passwordState.isValid
    );*/
  };

  const passwordChangeHandler = (event) => {
    /* setEnteredPassword(event.target.value); */
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    /* setFormIsValid( 
      enteredEmail.includes("@") && event.target.value.trim().length > 6 -This was before the useReducer
      emailState.isValid && event.target.value.trim().length > 6  Dunno what is happening. isValid check I understand the other part not so much. lecture 116. f..... 
    );  */
  };

  const validateEmailHandler = () => {
    /* setEmailIsValid(enteredEmail.includes('@')); -before useReducer*/
    /* setEmailIsValid(emailState.isValid); useReducer first edition */
    dispatchEmail({
      type: "INPUT_BLUR",
    }); /* AND we dont need to add here a value neccesarily bec "all we care that the input lost focus""there is no extra data thet needs to be added" for what reason*/ /* our stuf should be the same so this is the same as the stuff what was "up to us" before */
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    /*  setPasswordIsValid(enteredPassword.trim().length > 6); */
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) { 
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) { /* We want to focus the first invalid input we find-so the email */
      emailInputRef.current.focus();
    } else {/* If email is valid tahn it will be the password wich is invalid so: */
      passwordInputRef.current.focus(); 
    }
    /* props.onLogin(enteredEmail, enteredPassword); */
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          idProp="email"
          label="E-Mail"
          typeProp="email"
          isValidProp={emailIsValid}
          valueProp={emailState.value}
          onChangeProp={emailChangeHandler}
          onBlurProp={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          onChangeProp={passwordChangeHandler}
          onBlurProp={validatePasswordHandler}
          idProp="password"
          label="Password"
          typeProp="password"
          isValidProp={passwordIsValid}
          valueProp={passwordState.value}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
