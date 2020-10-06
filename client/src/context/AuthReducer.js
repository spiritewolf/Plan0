import AsyncStorage from '@react-native-community/async-storage';

export default (state, action) => {
  switch(action.type){
    case 'GET_USER':
    //console.log(action.payload);
      return{
        ...state,
        auth: true,
        loading: false
      }
    case 'POST_SIGNUP':
      return{
        ...state,
        ...action.payload,
        loading: false
      }
    case 'GUEST_LOGIN':
      return{
        ...state,
        user: 'guest',
        auth: true,
        loading: false
      }
    case 'POST_LOGIN':
      return{
        ...state,
        auth: true,
        loading: false,
        user: action.payload.user.username
      }
    case 'AUTH_ERROR':
    case 'GET_LOGOUT':
    case 'LOGIN_ERROR':
      return {
        ...state,
        token: null,
        auth: false,
        loading: false,
        user: null,
        error: action.payload
      }
    default:
      return state;
  }
}
