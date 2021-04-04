import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@material-ui/core";
import { Button } from "@chakra-ui/button";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../context";

export default function NavBar({ onOpen, btnRef }) {
  const { userName, userImage, search, updateSearch } = useGlobalContext();

  return (
    <div className="header__navbar">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Facebook_f_Logo_%28with_gradient%29.svg/1024px-Facebook_f_Logo_%28with_gradient%29.svg.png"
          alt="facebook logo"
        />
        <div className="header__input">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={updateSearch}
            name="search"
          />
        </div>
      </div>
      <div className="header__center">
        <div className="header__option header__option-active">
          <HomeIcon fontSize="large" />
        </div>
        <div className="header__option">
          <FlagIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SubscriptionsOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <StorefrontOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SupervisedUserCircleIcon fontSize="large" />
        </div>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar src={userImage} name={userName} />
          <h4>{userName}</h4>
        </div>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <ForumIcon />
        </IconButton>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton ref={btnRef} background="transparent" onClick={onOpen}>
          <FaBars color="gray" />
        </IconButton>
      </div>
    </div>
  );
}
