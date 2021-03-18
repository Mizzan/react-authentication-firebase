import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { photoURL, displayName, email } = res.user;
        const singedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(singedInUser);
        console.log(photoURL, displayName, email);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signOutUser = {
          isSignIn: false,
          name: "",
          photo: "",
          email: "",
        };
        setUser(signOutUser);
      })
      .catch((error) => console.log(error));
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFormValid);
    }
    if (e.target.name === "password") {
      const isFormValid =
        e.target.value.length > 6 && /\d{1}/.test(e.target.value);
      console.log(isFormValid);
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = () => {};

  const formStyle = {
    width: "400px",
    margin: "0 auto",
    marginTop: "50px",
    paddingBottom: "50px",
  };
  return (
    <div className="App">
      <div className="center">
        {!user.isSignIn ? (
          <button onClick={handleSignIn}>Sign In With Google</button>
        ) : (
          <button onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
      {user.isSignIn && (
        <div className="desc">
          <img src={user.photo} alt="" />
          <h1>Welcome {user.name}</h1>
          <h4>Your email: {user.email}</h4>
        </div>
      )}
      <p>Email : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p>

      <form style={formStyle} onSubmit={handleSubmit}>
        <fieldset>
          <input
            onBlur={handleBlur}
            // disabling the email type for using the regex
            // type="email"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            // disabling the email type for using the regex
            // type="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            required
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </fieldset>
        <button type="submit">Lgo In with Email</button>
      </form>
    </div>
  );
}

export default App;
