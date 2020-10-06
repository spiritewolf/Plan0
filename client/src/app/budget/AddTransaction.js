import React, {useState, useContext} from 'react';
import moment from 'moment';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppContext} from '../../context/AppContext';

export const AddTransaction = () => {
  const {addTransaction} = useContext(AppContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const date = moment().format('MM/DD/YYY');
  const transaction = {text, amount, category, date}

  const handlePress = () => {
    if(!category || !text || !amount){
      Alert.alert('Error', 'Make sure all fields are filled out!', {text: 'OK'})
    }else{
      addTransaction(transaction);
    }
    setText('');
    setAmount('');
    setCategory('');
  }

  return (
    <View style={styles.container}>
    <View style={styles.categories}>
        <MaterialIcons name="attach-money" size={40} color={(category == 'Income') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Income')}/>
        <Text style={styles.text}>Income</Text>
        <MaterialIcons name="people" value="Outing" size={38} color={(category == 'Outing') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Outing')} />
        <Text style={styles.text}>Social</Text>
        <MaterialCommunityIcons name="food" size={40} color={(category == 'Dining') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Dining')}/>
        <Text style={styles.text}>Dining</Text>
        <FontAwesome5 name="money-check-alt" size={38} color={(category == 'Bill') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Bill')} />
        <Text style={styles.text}>Bill</Text>
      </View>
      <View style={styles.categories}>
        <MaterialIcons name="pets" size={38} color={(category == 'Pet') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Pet')} />
        <Text style={styles.text}>Pet</Text>
        <MaterialCommunityIcons name="home" value="Rent" size={40} color={(category == 'Rent') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Rent')} />
        <Text style={styles.text}>Rent</Text>
        <FontAwesome5 name="gas-pump" value="Gas" size={38} color={(category == 'Gas') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Gas')} />
        <Text style={styles.text}>Gas</Text>
        <AntDesign name="rocket1" value="Other" size={38} color={(category == 'Other') ? '#c8c4fc' : '#fca567'} style={styles.btn}
          onPress={() => setCategory('Other')} />
        <Text style={styles.text}>Misc</Text>
      </View>
      <View style={styles.add}>
        <TextInput returnKeyType="done" value={text} onChangeText={(words) => setText(words)} placholderTextColor="#c8c4fc" placeholder="Description" style={styles.input}/>
        <TextInput returnKeyType="done" keyboardType="decimal-pad" value={amount} onChangeText={(words) => setAmount(words)} placholderTextColor="#c8c4fc" placeholder="Amount" style={styles.input}/>
        <TouchableOpacity style={styles.addBtn} onPress={handlePress}>
          <AntDesign name="plus" size={20} color="white" />
          <Text style={{fontSize: 18, color: 'white', paddingRight: 5, fontFamily: 'Menlo',}}> Budget it!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  add: {
    maxWidth: '45%',
    flexDirection: 'column'
  },
  categories: {
    width: '18%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  addBtn: {
    backgroundColor: '#c8c4fc',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25
  },
  text: {
    fontSize: 15,
    color: "#c8c4fc",
    fontFamily: 'Menlo'
  },
  btn: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  input: {
    padding: 8,
    fontSize: 18,
    backgroundColor: '#f7f7f7',
    borderColor: '#fca567',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
    width: '100%',
    fontFamily: 'Menlo',
    color: '#c8c4fc',
    textAlign: 'center',
  }
});
