import { GET_IMAGE_SUCCESS, USER_LOGIN_SUCCESS } from "../types";
const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || "",
  isAuthInProgress: true
};

export function currentUser(state = initialState, action) {
  // console.log("inside reducer",action)
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      // console.log("inside action",action)
      return {
        ...state,
        user: action.data.user,
        isAuthInProgress: false
      };

    case "USER_LOGIN_FAILED":
      localStorage.clear();
      return {
        ...state,
        isAuthInProgress: false,
        user: null
      };
    case "USER_RELOAD":
      return {
        ...state,
        user: action.data.user
      };

    case "LOG_OUT":
    case "NO_TOKEN":
      return {
        ...state,
        user: null,
        isAuthInProgress: false,
        token: ""
      };
    default:
      return state;
  }
}

export function IssuesInfo(state = initialState, action) {
  switch (action.type) {
    case "ADD_ISSUES":
      // console.log(action.data.Issues,"ADD_ISSUES 41");
      return {
        ...state,
        Issues: action.data.Issues
      };
    default:
      return state;
  }
}

const initState = {
  image: ""
};

export function imgReducer(state = initState, action) {
  switch (action.type) {
    case GET_IMAGE_SUCCESS: {
      return {
        ...state,
        image: action.image
      };
    }

    default:
      return state;
  }
}
