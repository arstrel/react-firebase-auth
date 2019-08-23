import React, { useContext } from 'react';
import * as firebase from 'firebase';
import { AuthContext } from "./index";

const ReportsView = () => {
  const Auth = useContext(AuthContext);
  
  const handleSignout = () => {
    firebase.auth().signOut();
    Auth.setLoggedIn(false);
  }

  return (
    <div>
      This is secret reports page
      <br />
      <br />
      <button onClick={handleSignout}>Signout</button>
    </div>
  );
};

export default ReportsView;