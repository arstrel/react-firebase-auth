import { AuthContext } from "./index";
import React, { useState, useContext } from "react";
import * as firebase from "firebase";

const GoogleAuth = () => {

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
   
    });
}

export default GoogleAuth;