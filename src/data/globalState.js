import React, { createContext, useContext, useReducer } from 'react';

// 1. Create a context
const GlobalStateContext = createContext();

// 2. Define the initial state
const initialState = {
    welcomeModal: false,
    theme: 'light',
    // Add other global variables here
  };

  const globalStateReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_WELCOME_MODAL':
        return {
          ...state,
          welcomeModal: action.payload,
        };
      
      // Add more cases for other actions here
      default:
        return state;
    }
  };



  export const GlobalStateProvider = ({children})=>{
    const [state, dispatch] = useReducer(globalStateReducer,initialState);

    return <GlobalStateContext.Provider value={{state,dispatch}} >
      {children}
      </GlobalStateContext.Provider>
  }


  export const useGlobalState = ()=>{
    return useContext(GlobalStateContext)
  }