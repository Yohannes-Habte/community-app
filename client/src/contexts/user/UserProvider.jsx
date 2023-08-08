import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';

// Initial State
export const initialState = {
  user: null,
  sacrament: '',
  prayer: '',
  spiritual: '',
  comment: '',
  loading: false,
  error: '',
};

// Create Context
export const UserContext = createContext(initialState);

// Function
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        sacrament: state.sacrament,
        prayer: state.prayer,
        spiritual: state.spiritual,
        comment: state.comment,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
