export default function reducer(state={
    carona: {},
    listaCaronista:[],
    caronasbyID: [],
    caronasbyEmail: [],
  }, action) {
    switch (action.type) {
        case 'CARREGAR_CARONA':{
          return{...state, carona: action.payload}
        }
        case 'LOAD_CARONISTA': {
          return {...state, listaCaronista: action.payload.data}
        }
       case 'LOAD_CARONA_BY_EMAIL_FULFILLED': {
         return {...state, caronasbyEmail: action.payload.data}
       }
       case 'LOAD_CARONA_BY_ID_FULFILLED': {
         return {...state, caronasbyID: action.payload.data}
       }
       default: {
         return state
       }


    }
}
