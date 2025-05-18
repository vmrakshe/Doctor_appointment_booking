//context api = global state management
//meaning we can use the data in any component without passing it as props
//When your app has global state like authentication that needs to be shared 
// across multiple components (like Navbar, Dashboard, Login, etc).

import React, { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: localStorage.getItem("user") //localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext(initialState);


//A function that modifies the state based on the action dispatched.
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        role: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,//Copies all existing properties of state
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
    case "DELETE_ACCOUNT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

//It provides the auth context value to the component tree,
//  allowing useContext(AuthContext) to work anywhere inside subtree component.
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
