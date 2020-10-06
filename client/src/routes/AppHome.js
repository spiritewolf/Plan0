import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../app/home/Home';
import {Budget} from '../app//budget/Budget';
import {Tasks} from '../app/tasks/Tasks';

const Tabs = createBottomTabNavigator();
Icon.loadFont();

export const AppHome = () => {
  return(
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({color, size }) => {
        let iconName;
        if(route.name === 'Home') {
          iconName = 'home-heart';
        }else if(route.name === 'Tasks') {
          iconName = 'format-list-checks';
        }else if(route.name === 'Budget') {
          iconName = 'cards-heart';
        }
        return <Icon name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: '#8077f9',
        inactiveTintColor: '#fff',
        style: {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            width: '100%', // Or using a percentage as required
            borderRadius: 30,
            backgroundColor: '#c8c4fc',
        }
      }} >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Tasks" component={Tasks} />
      <Tabs.Screen name="Budget" component={Budget} />
    </Tabs.Navigator>
  );
}
