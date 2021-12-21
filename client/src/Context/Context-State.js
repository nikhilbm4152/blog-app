import React, { useEffect, useReducer } from "react";
import blogContext from "./Context-context";
import constextReducer from "./Context-Reducer";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CATEGORIES,
  UPDATE_USER,
} from "./Context-Action";
import axios from "axios";

// const Context = blogContext;

const BlogState = (props) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    categories: [],
  };

  const [state, dispatch] = useReducer(constextReducer, initialState);

  // useEffect(() => {
  //   const fetchCatgy = async () => {
  //     const res = await axios.get("/catgy");
  //     category(res.data.map((cat) => cat.name));
  //   };
  //   fetchCatgy();
  // }, []);

  //setting up the user
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const loginStart = () => {
    dispatch({ type: LOGIN_START });
  };
  const loginSuccess = (data) => {
    console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  };
  const loginFalure = () => {
    dispatch({ type: LOGIN_FAILURE });
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const category = (catgy) => {
    dispatch({ type: CATEGORIES, payload: catgy });
    // dispatch({ type: CATEGORIES });
  };
  const updateUser = (data) => {
    console.log(data);
    dispatch({ type: UPDATE_USER, payload: data });
  };

  console.log(state.categories);

  return (
    <blogContext.Provider
      value={{
        user: state.user,
        categories: state.categories,
        loginStart,
        loginSuccess,
        loginFalure,
        logout,
        category,
        updateUser,
      }}
    >
      {props.children}
    </blogContext.Provider>
  );
};
export default BlogState;
