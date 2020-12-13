import React, { useReducer } from "react";

//////////////////////
// INITIAL STATE
//////////////////////

const initialState = {
  url: "https://homemakerapidos.herokuapp.com",
  token: null,
  username: null,
  projects: null,
  new: {
    title: "",
    body: "",
  },
  edit: {
    id: 0,
    title: "",
    body: "",
  },
};

///////////////////////
// REDUCER
///////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
      
    case "logout":
      newState = { ...state, token: null, username: null };
      window.localStorage.removeItem("auth");
      return newState;
      
    case "getProjects":
      newState = { ...state, projects: action.payload };
      return newState;
      
    case "select":
      newState = { ...state, edit: action.payload };
      return newState;
      
    default:
      return state;
      
  }
};

////////////////////
// AppContext
////////////////////
const AppContext = React.createContext(null);

////////////////////
// AppState Component
////////////////////
export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

////////////////////
//useAppState hook
////////////////////

export const useAppState = () => {
  return React.useContext(AppContext);
};