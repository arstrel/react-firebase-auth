import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";
import { withRouter } from 'react-router-dom';


const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=> {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if(res.user) {
          history.push('/reports')
          console.log(res.user);
          Auth.setLoggedIn(true)
        }
      })
      .catch(err => {
        setErrors(err.message);
      })
    })
  };

  
  const handleGoogleLogin = e => {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=> {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
        // This gives you a Google Access Token.
        //which can be used to fetch additional data using the Google APIs.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        if(user) {
          history.push('/reports')
          console.log(user);
          Auth.setLoggedIn(true)
        }
        })
        .catch(err => setErrors(err.message));
    })
   }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />
        <button className="googleBtn" type="button" onClick={handleGoogleLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
        <button type="submit">Login</button>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default withRouter(Login);
