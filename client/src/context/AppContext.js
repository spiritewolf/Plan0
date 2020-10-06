import React, { createContext, useReducer, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppReducer from './AppReducer';
import AsyncStorage from '@react-native-community/async-storage';
import * as api from '../api/apiconfig';
import axios from 'axios';

const initialState = {
  transactions: [],
  tasks: [],
  error: null,
  loading: true
}
export const AppContext = createContext(initialState);

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

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTasks = async() => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axios.get(api.TASKS, tokenConfig(token));
      dispatch({
        type: 'GET_TASKS',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log(err);
    }
  }

  const addTask = async(task) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axios.post(api.TASKS, task, tokenConfig(token));
      dispatch({
        type: 'ADD_TASK',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log('from add task' + err);
    }
  }

  const deleteTask = async(id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.delete(`${api.TASKS}/${id}`, tokenConfig(token));
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'USER_ERROR',
        payload: err.response.data.error
      });
    }
  }

  const getTransactions = async() => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axios.get(api.TRANSACTIONS, tokenConfig(token));
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log(err);
    }
  }

  const addTransaction = async(transaction) => {
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    try {
      const res = await axios.post(api.TRANSACTIONS, transaction, tokenConfig(token));
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log(err);
    }
  }

  const deleteTransaction = async(id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.delete(`${api.TRANSACTIONS}/${id}`, tokenConfig(token));
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      if(err) console.log(err);
    }
  }

  return (
    <AppContext.Provider value={{
      transactions: state.transactions,
      tasks: state.tasks,
      loading: state.loading,
      error: state.error,
      addTask,
      addTransaction,
      getTasks,
      getTransactions,
      deleteTask,
      deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
}
