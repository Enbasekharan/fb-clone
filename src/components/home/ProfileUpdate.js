import React, { useState } from "react";
import { auth } from "../../firebase";
import { useGlobalContext } from "../context";

export default function ProfileUpdate({ setUpdateProfile, updateProfile }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const { setprofile, profile } = useGlobalContext();

  const handleUpdate = () => {
    var user = auth.currentUser;
    user
      .updateProfile({
        displayName: name,
        photoURL: image,
      })
      .then(function () {
        // console.log("success");
        setprofile(!profile);
        setUpdateProfile(!updateProfile);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Display Name</label>
        <input
          type="text"
          autoFocus
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <p className="errorMsg">{emailerr}</p> */}
        <label>Profile Pic URL</label>
        <input
          type="password"
          placeholder="Optional"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {/* <p className="errorMsg">{passwordErr}</p> */}
        <div className="btnContainer">
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </section>
  );
}
