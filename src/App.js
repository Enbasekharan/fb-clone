import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Hero from "./components/home/Hero";
import "./App.css";
import "./components/login/login.css";
import { auth } from "./firebase";
import ProfileUpdate from "./components/home/ProfileUpdate";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [updateProfile, setUpdateProfile] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);
  const [isLoading, setLoading] = useState(false);
  // console.log(isLoading);
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailerr("");
    setPasswordErr("");
  };

  const handleLogin = () => {
    clearErrors();
    setLoading(!isLoading);
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setLoading(false);
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailerr(err.message);
          break;
        case "auth/wrong-password":
          setPasswordErr(err.message);
          break;
        default:
          throw new Error(`no mathching action type`);
      }
    });
  };

  const handleSignUp = () => {
    clearErrors();
    setLoading(!isLoading);
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      setLoading(false);
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailerr(err.message);
          break;
        case "auth/weak-password":
          setPasswordErr(err.message);
          break;
        default:
          throw new Error(`no mathching action type`);
      }
    });
    setUpdateProfile(!updateProfile);
  };

  const handleLogOut = () => {
    auth.signOut();
  };
  useEffect(() => {
    const authListner = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          setUser(user);
        } else {
          setUser("");
        }
      });
    };
    authListner();
  }, []);

  return (
    <div className="App">
      {user ? (
        updateProfile ? (
          <Hero handleLogOut={handleLogOut} />
        ) : (
          <ProfileUpdate
            setUpdateProfile={setUpdateProfile}
            updateProfile={updateProfile}
            setLoading={setLoading}
            isLoading={isLoading}
          />
        )
      ) : (
        <Login
          user={user}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailerr={emailerr}
          passwordErr={passwordErr}
          setUpdateProfile={setUpdateProfile}
          setLoading={setLoading}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
