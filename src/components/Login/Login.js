import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailvalidator = (state, action) => {
  if(action.type==='Email_Input')
  {
    return { value:action.val , isValid: action.val.includes('@') };
  }
  if(action.type==='Input_Check')
  {
    // now the previous values are stored in the values 
    // of the state and this is now used to call the previous values of the state
    return { value:state.value, isValid:state.value.includes('@') };
  }
  return {value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, checkemail] = useReducer(emailvalidator,
    {
      value: '',
      isValid: null
    });
  
  
  // useEffect(()=>{

  //   const identifier = setTimeout(()=>{
  //     console.log("Checking form validity");
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   },1500);

  //   return ()=>{
  //     clearTimeout(identifier);
  //     console.log("Removed previous timer!!");
  //   }
  //   }, [enteredEmail, enteredPassword]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    checkemail({
      type:'Email_Input',val:event.target.value
    });
         setFormIsValid(
        event.target.value.includes('@') && enteredPassword.trim().length > 6
      );

  };

  const passwordChangeHandler = (event) => {
    
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    checkemail({
      type: 'Input_Check'
    })
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${email.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
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
