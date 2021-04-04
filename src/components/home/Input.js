import React from "react";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import { dataBase, date } from "../../firebase";
import { useGlobalContext } from "../context";

function InputField({ editItem, input, setInput, imageurl, setImageurl }) {
  const { userUID, userName, userImage } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    input &&
      dataBase.collection("posts").add({
        picture: imageurl,
        message: input,
        timestamp: date.serverTimestamp(),
        likes: 0,
        comments: [],
        userID: userUID,
        user: { name: userName, image: userImage },
        likedBy: [],
      });
    setInput("");
    setImageurl("");
  };

  return (
    <>
      <section className="input__container">
        <div className="input__bottom">
          <Avatar name={userName} src={userImage}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>

          <Input
            className="input__message"
            type="text"
            placeholder={`What's on your mind ${userName} ?`}
            variant="filled"
            bg="white"
            color="black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Image URL (Optional)"
            variant="filled"
            bg="#white"
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
          />
          <Button
            type="button"
            onClick={(e) => handleSubmit(e)}
            padding="10px"
            display="block"
          >
            Post
          </Button>
        </div>
      </section>
    </>
  );
}

export default InputField;
