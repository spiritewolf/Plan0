import React, {useState, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {AddTransaction} from './AddTransaction';
import {ListTransactions} from './ListTransactions';
import {Balance} from './Balance';
import {CenterHome} from '../../Center';

const Stack = createStackNavigator();

function BudgetMain() {
  return(
    <View style={{flexGrow: 1, backgroundColor: '#FFFDE7', justifyContent: 'center', alignItems: 'center', paddingTop: 60}}>
      <Balance />
      <AddTransaction />
      <ListTransactions />
    </View>
  )
}

export const Budget = () => {

  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Budget Tracker" component={BudgetMain} />
    </Stack.Navigator>
  )
};
