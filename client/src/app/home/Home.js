import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import {AuthContext} from '../../context/AuthContext';
import {AppContext} from '../../context/AppContext';
import {Feed} from './Feed';

const Stack = createStackNavigator();

export const Home = ({navigation}) => {
  const {logout, token, getUser} = useContext(AuthContext);
  useEffect(() => {
    getUser()
  }, [])

  const handlePress = () => {
    logout();
  }

  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FFFDE7'
      },
      title: () => null,
      headerRight: () => {
        return(
          <TouchableOpacity style={styles.logout} onPress={handlePress}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
      )}
    }}>
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  logout: {
    padding: 2,
    marginRight: 5,
  },
  logoutText: {
    fontSize: 15,
    color: '#fca567',
    marginRight: 5,
    padding: 10,
    fontFamily: 'Menlo'
  }
})
