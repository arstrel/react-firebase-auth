import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";
import GoogleAuth  from "./GoogleAuth.js";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      if(res.user) Auth.setLoggedIn(true);
    })
    .catch(err => {
      setErrors(err.message);
    })
  };

  const handleGoogleLogin = e => {
   // Using a popup.
   var provider = new firebase.auth.GoogleAuthProvider();
   provider.addScope('profile');
   provider.addScope('email');
   firebase
   .auth()
   .signInWithPopup(provider)
   .then(function(result) {
   // This gives you a Google Access Token.
   //which can be used to fetch additional data using the Google APIs.
   var token = result.credential.accessToken;
   // The signed-in user info.
   var user = result.user;
   console.log(user);
    Auth.setLoggedIn(true)
   });
  }

  return (
    <div>
      <h1>Join</h1>
      <form onSubmit={handleForm}>
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
          Join With Google
        </button>

        <button type="submit">Login</button>

        <span>{error}</span>
      </form>
    </div>
  );
};

export default Join;
