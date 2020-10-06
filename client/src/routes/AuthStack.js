import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../auth/Login';
import {SignUp} from '../auth/SignUp';
import {AuthContext} from '../context/AuthContext';
import {AppHome} from './AppHome';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return(
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  )
}
