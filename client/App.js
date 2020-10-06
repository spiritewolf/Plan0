import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Routes} from './src/routes/Routes';
import {AuthProvider} from './src/context/AuthContext';
import {AppProvider} from './src/context/AppContext';

export default App = () => {
  return(
    <NavigationContainer initialRoute='Login'>
      <AuthProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
