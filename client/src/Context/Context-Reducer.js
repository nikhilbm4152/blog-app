import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CATEGORIES,
  UPDATE_USER,
  POST_USERNAME,
} from "./Context-Action";

const constextReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case POST_USERNAME:
      return {
        ...state,
        postUser: action.payload,
      };

    default:
      return state;
  }
};

export default constextReducer;
