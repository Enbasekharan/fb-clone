import React, { useState } from "react";
import Input from "./Input";
import Post from "./Post";
import Sidebar from "./Sidebar";
import { useGlobalContext } from "../context";
import { dataBase } from "../../firebase";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
function HeroDrawer({ handleLogOut }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
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
      <NavBar btnRef={btnRef} onOpen={onOpen} />
      <section className="body">
        <Input
          editItem={editItem}
          input={input}
          setInput={setInput}
          imageurl={imageurl}
          setImageurl={setImageurl}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                Hello{"  "}
                {userName}
              </DrawerHeader>

              <DrawerBody>
                <Sidebar />
              </DrawerBody>

              <DrawerFooter>
                <Button
                  colorScheme="blue"
                  onClick={handleLogOut}
                  marginRight="20px"
                >
                  Log Out
                </Button>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Post editItem={editItem} />
      </section>
    </section>
  );
}

export default HeroDrawer;
