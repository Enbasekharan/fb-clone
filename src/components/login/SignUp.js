import React from "react";

function SignUp({
  user,
  email,
  setEmail,
  password,
  setPassword,
  handleSignUp,
  hasAccount,
  setHasAccount,
  emailerr,
  passwordErr,
  isLoading,
}) {
  return (
    <section className="login">
      <div className="loginContainer">
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailerr}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordErr}</p>
        <div className="btnContainer">
          <button onClick={handleSignUp} disabled={isLoading}>
            Sign Up
          </button>
          <p>
            Have an Account ?
            <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
