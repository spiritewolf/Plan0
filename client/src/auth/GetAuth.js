import React, {useEffect, useContext} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export const GetAuth = ({navigation}) => {
  const {getAuth, user, auth} = useContext(AuthContext);

  useEffect(() => {
    console.log('loading')
    getAuth();
    if(auth){
      navigation.navigate('App');
    }else{
      navigation.navigate('Auth');
    }
  }, [auth]);

  const getUser = async() => {
    try{
      const info = await getAuth();
      if(auth){
        navigation.navigate('App');
      }else{
        navigation.navigate('Auth');
      }
   }catch(err){
      if(err) console.log(err);
      navigation.navigate('Auth');
    }
  }

  return(
    <View>
      <ActivityIndicator />
      <Text>USer Loading </Text>
    </View>
  )
}
