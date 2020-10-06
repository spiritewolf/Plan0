import React from 'react';
import {View} from 'react-native';

export const Center = ({children}) => {
  return(
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    {children}
    </View>
  )
}
// good color: '#c8c4fc' '#FFFDE7' fca567
export const CenterHome = ({children}) => {
  return(
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFDE7',
      width: '100%',
      textAlign: 'left'
    }}>
    {children}
    </View>
  )
}

export const HomeContainer = ({children}) => {
  return(
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFDE7',
      borderRadius: 10,
      borderColor: '#c8c4fc',
      borderWidth: 3,
      padding: 40,
      width: '90%',
      borderShadowColor: '#a9a4fc',
      borderShadowOffset: {
        height: 25,
        width: -25
      },
      borderShadowRadius: 10
    }}>
    {children}
    </View>
  )
}

export const FeedHome = ({children}) => {
  return(
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#c8c4fc',
      width: '100%',
      textAlign: 'left'
    }}>
    {children}
    </View>
  )
}
