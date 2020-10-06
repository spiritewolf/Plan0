import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import {AuthContext} from '../../context/AuthContext';
import {AppContext} from '../../context/AppContext';
import {Total} from '../budget/Balance';
import {FeedHome, CenterHome, HomeContainer} from '../../Center';

export const Feed = () => {
  const [loading, setLoading] = useState(true);
  const {tasks, getTasks, getTransactions} = useContext(AppContext);
  const {user} = useContext(AuthContext);
  const date = moment().format('MM/DD/YYY');
  let num = tasks.map(task => task);
  num = num[0]

  useEffect(() => {
    getTransactions();
    getTasks();
  }, [])

  return(
    <CenterHome>
      <Text style={styles.headerText}>{date}</Text>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 30, fontFamily: 'Menlo', color: '#fca567'}}>Welcome, {user}!</Text>
        </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={styles.text}>Balance</Text>
        <Total />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Most recent task:</Text>
          {(tasks.length > 0) ? (
            <Text style={{fontSize: 20, fontFamily: 'Menlo', color: '#c8c4fc'}}>{num.text}</Text>
          ): null }
        </View>
      </View>
    </CenterHome>
      )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    maxHeight: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#c8c4fc',
    borderWidth: 2,
    backgroundColor: '#fff',
    margin: 25,
  },
  textContainer: {
    flexDirection: 'column'
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Menlo',
    marginTop: 60,
    marginRight: 150,
    color: '#c8c4fc',
  },
  text: {
    color: '#fca567',
    fontSize: 20,
    fontFamily: 'Menlo'
  }
})
