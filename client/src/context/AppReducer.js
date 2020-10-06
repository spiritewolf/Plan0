export default (state, action) => {
  switch(action.type){
    case 'GET_TASKS':
      return{
        ...state,
        tasks: action.payload,
        loading: false
      }
    case 'ADD_TASK':
      return{
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false
      }
    case 'DELETE_TASK':
      return{
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      }
    case 'GET_TRANSACTIONS':
      return{
        ...state,
        transactions: action.payload,
        loading: false
      }
    case 'ADD_TRANSACTION':
      return{
        ...state,
        transactions: [action.payload, ...state.transactions],
        loading: false
      }
    case 'DELETE_TRANSACTION':
      return{
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'USER_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
