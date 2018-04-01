export default function reducer(state={
    carona: {},
  }, action) {
    switch (action.type) {
       case 'CARONA_PEND':{
         return{...state, carona: action.payload}
       }
       case 'LOAD_CARONA_FULFILLED': {
         return {...state, carona: action.payload.data}
       }
       default: {
         return state
       }


    }
}
