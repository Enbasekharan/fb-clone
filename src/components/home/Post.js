import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { dataBase } from "../../firebase";
import { useGlobalContext } from "../context";
import { Avatar } from "@chakra-ui/avatar";

const Post = ({ editItem }) => {
  const { userUID, filtered_products, posts } = useGlobalContext();

  const removeItem = (id) => {
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
  };
  const likeHandler = (id) => {
    let post = posts.find((item) => item.id === id);
    if (!post.data.likedBy.includes(userUID)) {
      dataBase
        .collection("posts")
        .doc(id)
        .update({ likedBy: [...post.data.likedBy, userUID] });
    } else {
      let newArr = post.data.likedBy.filter((item) => item !== userUID);
      dataBase.collection("posts").doc(id).update({ likedBy: newArr });
    }
  };

  return (
    <div className="posts">
      {filtered_products.map((item, index) => {
        const { id, data } = item;
        // console.log(data);
        const { message, picture, timestamp, userID, likedBy, user } = data;
        // console.log(user[0]);
        // user && (const {name, image} = user)
        // const { name, image } = user;
        return (
          <article className="post" key={id}>
            <div className="post__top">
              <div className="user">
                {user ? (
                  <Avatar name={user.name} src={user.image} />
                ) : (
                  <Avatar />
                )}
                <div className="header">
                  <h4 className="title">{user?.name}</h4>
                  <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
              </div>
              <div className="btn__container">
                {userID === userUID && (
                  <>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => editItem(id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeItem(id)}
                    >
                      <FaTrash color="red" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <h3 className="title">{message}</h3>

            {picture && <img src={picture} alt={userID}></img>}
            <div className="like">
              <button onClick={() => likeHandler(id)}>
                {likedBy?.includes(userUID) ? (
                  <AiFillLike />
                ) : (
                  <AiOutlineLike />
                )}
              </button>
              <p>{likedBy?.length}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Post;
