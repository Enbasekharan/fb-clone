import React, { useState, useContext, useEffect, useReducer } from "react";
import { auth, dataBase } from "../firebase";

import {
  SET_LOADING,
  SET_STORIES,
  USER_LOGIN,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTER,
  FILTER_PRODUCTS,
  UPDATE_SEARCH,
} from "./action";
import reducer from "./reducer";

const initialState = {
  isLoading: true,
  userUID: "",
  userName: "",
  userImage: "",
  posts: [],
  filtered_products: [],
  sort: "date-recent",
  search: "",
  filter: "all",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [profile, setprofile] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUserID = () => {
    dispatch({ type: SET_LOADING });
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: USER_LOGIN, payload: user });
      }
    });
  };

  const fetchStories = async () => {
    dispatch({ type: SET_LOADING });
    try {
      dataBase
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          let posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          dispatch({ type: SET_STORIES, payload: posts });
        });
    } catch (error) {}
  };
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilter = (e) => {
    let value = e;
    dispatch({ type: UPDATE_FILTER, payload: value });
  };
  const updateSearch = (e) => {
    let value = e.target.value;
    dispatch({ type: UPDATE_SEARCH, payload: value });
  };

  useEffect(() => {
    fetchUserID();
    fetchStories();
  }, [profile]);

  useEffect(() => {
    fetchUserID();
    fetchStories();
  }, []);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.posts, state.sort, state.filter, state.search]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateSort,
        updateFilter,
        updateSearch,
        profile,
        setprofile,

        // handleSearch,
        // handlePage,
        // handlePageIndex,
        // setSortByDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
