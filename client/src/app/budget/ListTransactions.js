import React, {useState, useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {Center} from '../../Center';

Icon.loadFont();

export const ListTransactions = () => {
  const {transactions, getTransactions, deleteTransaction} = useContext(AppContext);
  useEffect(() => {
    getTransactions();
  }, [])

  const handlePress = (transaction) => {
    console.log(transaction);
    deleteTransaction(transaction);
  }

  return(
    <View style={{flexGrow: 2, width: '100%', borderRadius: 10, padding: 25, marginBottom: 15}}>
      <FlatList contentContainerStyle={styles.container} data={transactions} renderItem={({item}) => (
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => handlePress(item._id)} style={(item.category !== 'Income') ? styles.negative : styles.listItem}>
              <Text style={{color: 'silver'}}> {item.date} </Text>
              <View style={styles.listItemView}>
                 <Text style={styles.numText}>{(item.category == 'Income') ? '+' : '-'} ${item.amount}</Text>
                 <Text style={styles.listItemText}>{item.text}</Text>
                 <Icon name="closesquareo" size={30} color="#c8c4fc" />
              </View>
              </TouchableOpacity>
        </View>
      )}/>
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
    height: '45%'
  },
  listItem: {
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderLeftWidth: 2,
    borderLeftColor: 'green',
    borderBottomWidth: 2,
    borderBottomColor: '#eee'
  },
  negative: {
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    borderBottomWidth: 2,
    borderBottomColor: '#eee'
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center'
  },
  listItemText: {
    fontSize: 20,
    color: '#c8c4fc',
    fontFamily: 'Menlo',
  },
  numText: {
    fontSize: 18,
    color: '#c8c4fc',
    fontFamily: 'Menlo'
  }
});
//
// <View style={{alignItems: 'center'}}>
//   <Text>{transactions.text}</Text>
//   {transactions.map(transaction =>
//     <TouchableOpacity onPress={() => handlePress(transaction.id)} style={(transaction.category !== 'Income') ? styles.negative : styles.listItem}>
//       <Text style={{color: 'silver'}}> {transaction.date} </Text>
//       <View style={styles.listItemView}>
//          <Text style={styles.listItemText}>{(transaction.category == 'Income') ? '+' : '-'} ${transaction.amount}</Text>
//          <Text style={styles.listItemText}>{transaction.text}</Text>
//          <AntDesign name="closesquareo" size={30} color="pink" />
//       </View>
//       </TouchableOpacity>
// )}
// </View>
