// export const reducer = (state = {count: 0}, action) => {
//     switch (action.type){
//       case 'INCREASE': return {count: state.count + 1};
//       case 'DECREASE': return {count: state.count - 1};
//       default: return state;
//     }
//   }
  export const Info = (state = {count:0}, action) => {
    switch (action.type) {
      case 'INCREMENT':
        state.count =  state.count +1;
        return state
      case 'DECREMENT':
          state.count =  state.count - 1;
        return state 
      case 'INCREMENT_ASYNC': //异步
        return state
      default:
        return state
    }
  }