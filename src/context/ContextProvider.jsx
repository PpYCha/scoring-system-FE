import React, { createContext, useContext, useEffect, useReducer } from "react";
import actionHelper from "./actionHelper";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  loading: false,
  userAccount: {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    event: "",
    role: "",
    status: "",
  },
  event: {
    title: "",
    description: "",
    date: "",
  },
  category: {
    category: "",
    description: "",
    percentage: "",
    event_id: "",
  },
  criteria: {
    description: "",
    percentage: "",
    category_id: "",
  },
  score: {
    score: "",
    contestant_id: "",
    judge_id: "",
    criteria_id: "",
    event_id: "",
  },
  contestant: {
    name: "",
    municipality: "",
    age: "",
    weight: "",
    height: "",
    shoeSize: "",
    swimsuitSize: "",
    bust: "",
    waist: "",
    hips: "",
    nickname: "",
    dateOfBirth: "",
    birthPlace: "",
    event_id: "",
  },
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const action = actionHelper();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      dispatch({ type: action.UPDATE_C_USER, payload: currentUser });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
