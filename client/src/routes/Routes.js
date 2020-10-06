import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import {AuthStack} from './AuthStack';
import {AppHome} from './AppHome';

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const {user, auth, token} = useContext(AuthContext);

  useEffect(() => {
    if(user !== null){
      setLoading(false);
    }else if(user == null){
      setLoading(true);
    }
  }, [user]);

  return(
    <>
      {(loading) ? <AuthStack /> : <AppHome /> }
    </>
  )
}
