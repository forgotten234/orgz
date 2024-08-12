import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });

  const setAuthData = (data) => {
    setAuth({data: data});
  };
 // a function that will help us to add the user data in the auth;
 useEffect(() => {
    setAuth({ loading: false, data: JSON.parse(window.localStorage.getItem('authData'))});
  }, []);
//2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false.
//This function will be executed every time component is mounted (every time the user refresh the page);

  useEffect(() => {
    window.localStorage.setItem('authData', JSON.stringify(auth.data));
  }, [auth.data]);

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
