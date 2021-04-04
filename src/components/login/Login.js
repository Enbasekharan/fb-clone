import React from "react";
import Signin from "./Signin";
import SignUp from "./SignUp";

function Login(props) {
  const {
    user,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailerr,
    passwordErr,
    setUpdateProfile,
    isLoading,
  } = props;
  return (
    <>
      {hasAccount ? (
        <Signin
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailerr={emailerr}
          passwordErr={passwordErr}
          isLoading={isLoading}
        />
      ) : (
        <SignUp
          user={user}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailerr={emailerr}
          passwordErr={passwordErr}
          setUpdateProfile={setUpdateProfile}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
export default Login;
