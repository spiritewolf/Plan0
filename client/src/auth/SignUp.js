import React, {useContext, useState} from 'react';
import {Alert, View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Keyboard} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {CenterHome, HomeContainer} from '../Center';

export const SignUp = ({navigation}) => {
  const {signup} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [registered, setRegistered] = useState(false);

  const handlePress = () => {
    Keyboard.dismiss();
    if(!username || !password){
      Alert.alert('Error', 'Username and password can not be blank!', {text: 'OK'});
    }else if(password.length < 6){
      Alert.alert('Error', 'Your password should be at least six characters', {text: 'OK'});
    }else if(password !== password2){
      Alert.alert('Error', 'Make sure your passwords match', {text: 'OK'});
    }else{
      const user = {username, password}
      console.log(user);
      signup(user);
      setRegistered(true);
    }
  }

  return(
      (registered) ? (
        <CenterHome>
          <HomeContainer>
            <Text style={{padding: 15, fontSize: 35, color: 'silver'}}>You've been signed up!</Text>
            <TouchableOpacity style={styles.btnContainer} onPress={navigation.navigate('Login')}>
              <Text style={{color: 'white'}}>Return to Login</Text>
            </TouchableOpacity>
          </HomeContainer>
        </CenterHome>
      ) :(
      <CenterHome>
        <HomeContainer>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={value => setUsername(value)} style={styles.input} placeholder="Enter your username" />
          <TextInput onChangeText={value => setPassword(value)} style={styles.input} secureTextEntry={true} placeholder="Enter your password" />
          <TextInput onChangeText={value => setPassword2(value)} style={styles.input} secureTextEntry={true} placeholder="Re-enter your password" />
        </View>
        <TouchableOpacity style={styles.btnContainer} title="Login"
          onPress={handlePress}>
          <Text style={styles.text} >Sign me up!</Text>
        </TouchableOpacity>
        </HomeContainer>
      </CenterHome>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
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
  text: {
    color: '#fca567',
    fontWeight: '400',
    fontFamily: 'Menlo'
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fca567',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontFamily: 'Menlo'
  },
});
