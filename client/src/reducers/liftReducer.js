export default function reducer(state={
    carona: {},
    listaCaronista:[],
    caronistaFull: false,
    caronasbyEmail: [],
    caronasbyID: [],
    listaMembros: [],
    membrosFull: false,
    members: []
  }, action) {
    switch (action.type) {
        case 'CARREGAR_CARONA':{
          return{...state, carona: action.payload}
        }
        case 'LOAD_CARONISTA_FULFILLED': {
          return {...state, listaCaronista: action.payload.data, caronistaFull: false}
        }
        case 'LOAD_CARONA_BY_ID_FULFILLED': {
          return {...state, caronasbyID: action.payload.data, caronistaFull: true}
        }
       case 'LOAD_CARONA_BY_EMAIL_FULFILLED': {
         return {...state, caronasbyEmail: action.payload.data}
       }
       case 'LOAD_MEMBROS_CARONA_FULFILLED': {
         return {...state, listaMembros: action.payload.data, membrosFull: false}
       }
       case 'LOAD_MEMBER_DATA_FULFILLED': {
         return {...state, members: action.payload.data, membrosFull: true}
       }
       default: {
         return state
       }

    }
}
