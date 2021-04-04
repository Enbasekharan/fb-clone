import React, { useState } from "react";
import Input from "./Input";
import Post from "./Post";
import Sidebar from "./Sidebar";
import { useGlobalContext } from "../context";
import { dataBase } from "../../firebase";

function Hero({ handleLogOut }) {
  const [input, setInput] = useState("");
  const [imageurl, setImageurl] = useState("");
  const { filtered_products, userName } = useGlobalContext();

  const editItem = (id) => {
    let editPost = filtered_products.find((item) => item.id === id);
    dataBase
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        // console.log("Document successfully deleted!");
      })
      .catch((error) => {
        // console.error("Error removing document: ", error);
      });
    setInput(editPost.data.message);
    setImageurl(editPost.data.picture);
  };
  return (
    <section className="hero">
      <nav>
        <h2>
          welcome{"    "}
          {userName}
        </h2>
        <button onClick={handleLogOut}>Log Out</button>
      </nav>

      <section className="body">
        <Input
          editItem={editItem}
          input={input}
          setInput={setInput}
          imageurl={imageurl}
          setImageurl={setImageurl}
        />
        <Sidebar />

        <Post editItem={editItem} />
      </section>
    </section>
  );
}

export default Hero;
