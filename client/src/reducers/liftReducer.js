export default function reducer(state={
    carona: {},
    listaCaronista:[],
    caronasbyID: [],
    caronasbyEmail: [],
    caronistaFull: false
  }, action) {
    switch (action.type) {
        case 'CARREGAR_CARONA':{
          return{...state, carona: action.payload}
        }
        case 'LOAD_CARONISTA_FULFILLED': {
          return {...state, listaCaronista: action.payload.data, caronistaFull: false}
        }
       case 'LOAD_CARONA_BY_EMAIL_FULFILLED': {
         return {...state, caronasbyEmail: action.payload.data}
       }
       case 'LOAD_CARONA_BY_ID_FULFILLED': {
         return {...state, caronasbyID: action.payload.data, caronistaFull: true}
       }
       default: {
         return state
       }


    }
}
