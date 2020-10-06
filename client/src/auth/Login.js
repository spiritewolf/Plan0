import React, {useContext, useState, useEffect} from 'react';
import {Alert, View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Keyboard} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {CenterHome, HomeContainer} from '../Center';

export const Login = ({navigation}) => {
  const {login, guestLogin} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    Keyboard.dismiss();
    if(!username || !password){
      Alert.alert('Error', 'Username and password can not be blank!', {text: 'OK'});
    }else{
      const user = {username, password};
      login(user);
    }
  }

  return(
    <CenterHome>
    <Text style={styles.welcomeTxt}>Plan0</Text>
      <HomeContainer>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={value => setUsername(value)} style={styles.input} placeholder="  USERNAME" placeholderTextColor = '#c8c4fc'/>
          <TextInput onChangeText={value => setPassword(value)} secureTextEntry={true} style={styles.input} placeholder="  PASSWORD" placeholderTextColor = '#c8c4fc' />
        </View>
        <TouchableOpacity style={styles.btnContainer} title="Login"
          onPress={handlePress}>
          <Text style={styles.text} >LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} title="Signup"
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.text} >SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} title="Guest"
          onPress={() => {
            Alert.alert('Warning', 'Continuing as guest will not save your data, to keep your data saved create an account.', {text: 'OK'})
            guestLogin();
          }}>
          <Text style={styles.text} >Continue As Guest</Text>
        </TouchableOpacity>
      </HomeContainer>
    </CenterHome>
  )
}

const styles = StyleSheet.create({
  welcomeTxt: {
    color: '#fca567',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 200,
    marginBottom: 10,
    fontFamily: 'Menlo'
  },
  btnContainer: {
    borderColor: 'rgba(200, 196, 252, .5)',
    borderWidth: 2,
    marginBottom: 15,
    padding: 12,
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#eeedf9',
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fca567',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontFamily: 'Menlo'
  },
  text: {
    color: '#fca567',
    fontWeight: '400',
    fontFamily: 'Menlo'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginBottom: 25
  }
});
