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
  POST_USERNAME,
} from "./Context-Action";

// const Context = blogContext;

const BlogState = (props) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    categories: [],
    postUser: "",
  };

  const [state, dispatch] = useReducer(constextReducer, initialState);

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
    dispatch({ type: UPDATE_USER, payload: data });
  };
  const postUserName = (data) => {
    dispatch({ type: POST_USERNAME, payload: data });
  };

  return (
    <blogContext.Provider
      value={{
        user: state.user,
        categories: state.categories,
        postUser: state.postUser,
        loginStart,
        loginSuccess,
        loginFalure,
        logout,
        category,
        updateUser,
        postUserName,
      }}
    >
      {props.children}
    </blogContext.Provider>
  );
};
export default BlogState;
