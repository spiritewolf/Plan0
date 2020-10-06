import React, { createContext, useReducer, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AuthReducer from './AuthReducer';
import AsyncStorage from '@react-native-community/async-storage';
import * as api from '../api/apiconfig';
import axios from 'axios';

const initialState = {
  user: null,
  auth: false,
  token: async() => await AsyncStorage.getItem('token'),
  error: null,
  loading: true
}
export const AuthContext = createContext(initialState);

const tokenConfig = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['x-auth-token'] = token;
  }else{
    console.log('no token');
  }

  return config;
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  async function getUser() {
    const tkn = await AsyncStorage.getItem('token');
    try{
      const res = await axios.get(api.USER, tokenConfig(tkn));
      console.log('getting user ');
      dispatch({
        type: 'GET_USER',
        payload: res.data
      });
    }catch(err){
      if(err) console.log(err);
      // dispatch({
      //   type: 'AUTH_ERROR'
      // });
    }
  }

  const login = async (users) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(api.LOGIN, users, config);
      await AsyncStorage.setItem('token', res.data.token);
      dispatch({
        type: 'POST_LOGIN',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log(err);
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error
      });
    }
  }

  const guestLogin = async () => {
    try{
      const user = 'guest';
      const tkn = uuidv4();
      AsyncStorage.setItem('token', JSON.stringify(tkn));
      dispatch({
        type: 'GUEST_LOGIN'
      })
    }catch(err){
      if(err) console.log(err);
    }
  }

  const signup = async ({username, password}) => {
    try {
      const user = {username, password}
      const res = await axios.post(api.SIGNUP, user);
      dispatch({
        type: 'POST_SIGNUP',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log('ERROR: ' + err);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response.data.error
      });
    }
  }
  async function logout() {
    try{
      console.log('user logged out');
      AsyncStorage.removeItem('token');
      dispatch({
        type: 'GET_LOGOUT'
      });
    }catch(err){
      if(err) console.log(err);
      dispatch({
        type: 'LOGOUT_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (
    <AuthContext.Provider value={{
      user: state.user,
      auth: state.auth,
      loading: state.loading,
      error: state.error,
      login,
      getUser,
      logout,
      signup,
      guestLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}
