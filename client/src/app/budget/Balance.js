import React, {useContext} from 'react';
import {Icon} from 'react-native-vector-icons/AntDesign';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Center} from '../../Center';
import {AppContext} from '../../context/AppContext';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Total = () => {
  const {transactions} = useContext(AppContext);
  const amounts = transactions.map(budget => budget.category == 'Income' ? parseFloat(budget.amount) : parseFloat(-budget.amount));
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return(
    <View>
        <Text style={{color: '#c8c4fc',
        fontSize: 20,
        fontFamily: 'Menlo'}}>${numberWithCommas(total)}</Text>
    </View>
  )
}

export const Balance = () => {
  const {transactions} = useContext(AppContext);
  const amounts = transactions.map(budget => budget.category == 'Income' ? parseFloat(budget.amount) : parseFloat(-budget.amount));
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.balanceText} >Balance:</Text>
        <Text style={styles.numText}>${numberWithCommas(total)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.wordText}>Earned: </Text>
        <Text style={styles.numText}>+ ${numberWithCommas(income)}  </Text>
        <Text style={styles.wordText}> Spent:</Text>
        <Text style={styles.numText}>- ${numberWithCommas(expense)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    maxWidth: '80%'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    maxWidth: '60%'
  },
  balanceText: {
    color: '#fca567',
    fontSize: 30,
    fontFamily: 'Menlo',
  },
  wordText: {
    color: '#c8c4fc',
    fontSize: 15,
    fontFamily: 'Menlo'
  },
  numText: {
    color: '#c8c4fc',
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'Menlo'
  }
});
