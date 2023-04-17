import React, {useRef, useImperativeHandle} from "react";


import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => { /* In the 99% of cases we will only need here a prop, but there is an other argument, which is - a ref - if the ref should be set from outside*/
                      /* Here we use it to the useImperativeHandle - hookhoz */
                      /* Here this ref is allowing the binding for the ref setted in Login.js */
                      /* But this comp from noow on has to be wrapped to this React.forwardRef() function(/or method) which we execute to which we pass our cmponent function. So our component function now is the first argument to forwardRef */
                /* So like this our component is capable to take a ref, but the only thing we will be capable to use is what we expose in useImperativeHandle */


/* Dont have to do this below, only put them in instead ogf the originals */
  /* const emailChangeHandler = props.onChangeProp;
  const validateEmailHandler = props.onBlurProp;
  const passwordChangeHandler = props.onChangeProp;
  const validatePasswordHandler = props.onBlurProp;
  const emailState = props.emailStateProp;
  const passwordState = props.passwordStateProp; */
/* So we are basically making instead of two separate form one form for the form, and then we are programing them witrh separate props on the form original file.  
      Lecture 127.*/

  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle( ref, () => {
    return { /* "So this is basically a translational object between internal functionalities, and the parent component" */
      focus: activate,   /* This "focus" is a pointer at the outside function which should be accessesd through the given name */
    };
  });
    return (
        <>
        <div
            className={`${classes.control} ${
              props.isValidProp === false ? classes.invalid : ''/* emailIsValid was. 2.: we dont want to focus on just the emailstate here, so we omitted that NOP WE DID FCKNIG NOTHING. IT IS JUST A FCKNG PROP, why max had to make some jumbo mambo around it- so i thought it is something else - dunno*/
            }`} >
            <label htmlFor={props.idProp}>{props.label}</label>
            <input
              ref={inputRef}
              type={props.typeProp}
              id={props.idProp}
              value={props.valueProp} /* value={enteredEmail} */
              onChange={props.onChangeProp}
              onBlur={props.onBlurProp}
            />
          </div>
          </>
    );
});


export default Input;