import React, { useContext, useState, useEffect, useReducer } from 'react';
import AuthContext from '../Store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailvalidator = (state, action) => {
  if (action.type === 'Email_Input') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'Input_Check') {
    // now the previous values are stored in the values 
    // of the state and this is now used to call the previous values of the state
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
}

const passwordvalidator = (state, action) => {
  if (action.type === 'Password_Input') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'Password_Check') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const ctx = useContext(AuthContext);
  const [email, checkemail] = useReducer(emailvalidator,
    {
      value: '',
      isValid: null
    });
  const [password, checkpassword] = useReducer(passwordvalidator,
    {
      value: '',
      isValid: null
    });

  // we want the use effect to only check our form validity so
  // we can only set it up to check the isValid parameter and lighten the tasks associated with it
  // so now we will use object destructuring and make the code
  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;

  useEffect(() => {

    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 1500);

    return () => {
      clearTimeout(identifier);
      console.log("Removed previous timer!!");
    }
  }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    checkemail({
      type: 'Email_Input', val: event.target.value
    });
    setFormIsValid(
      event.target.value.includes('@') && password.value.trim().length > 6
    );

  };

  const passwordChangeHandler = (event) => {

    // setEnteredPassword(event.target.value);
    checkpassword({
      type: 'Password_Input',
      val: event.target.value
    })

    setFormIsValid(
      event.target.value.includes('@') && password.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    checkemail({
      type: 'Input_Check'
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    checkpassword({
      type: 'Password_Check'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(email.value, password.value);
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
          className={`${classes.control} ${password.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
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
