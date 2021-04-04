import React from "react";

function Signin({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
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
          <button onClick={handleLogin} disabled={isLoading}>
            Sign In
          </button>
          <p>
            Don't have an Account ?
            <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signin;
