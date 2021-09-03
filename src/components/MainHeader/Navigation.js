import React,{useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../Store/auth-context';
const Navigation = () => {
  const obj=useContext(AuthContext);
  return (
        <nav className={classes.nav}>
          <ul>
            {obj.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {obj.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {obj.isLoggedIn && (
              <li>
                <button onClick={obj.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
  );
};

export default Navigation;
