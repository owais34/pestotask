import React, { useReducer } from "react";

const GlobalStateContext = React.createContext();

const initialState = {
  userData: {},
  isLoggedIn: false,
  taskList:[],
  token:"",
  userProfile:{},
  reload:false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":

      return {
        ...state,
        userData:{
          ...state.userData,
          ...action.payload
        }

      };
    
    case "SET_TASK":
      return {
        ...state,
        taskList: [...action.payload]
      }
    case "RESET":
      return initialState;
    case "SET_TOKEN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload
      }
    case "SET_RELOAD":
      const init = state.reload
      return {
        ...state,
        reload: !init
      }
    default:
      return state;
  }
}

function GlobalStateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={[ state, dispatch ]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}

export { GlobalStateProvider, GlobalStateContext };
