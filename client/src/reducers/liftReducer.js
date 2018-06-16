export default function reducer(state={
    carona: {},
    listaCaronista:[],
    caronasbyEmail: [],
    listaMembros: [],
    resultCaronas: [],
    members: [],
  }, action) {
    switch (action.type) {
      case 'CARREGAR_CARONA':{
        return{...state, carona: action.payload}
      }
      case 'RESULT_CARONAS':{
        return{...state, resultCaronas: action.payload}
      }
      case 'LOAD_CARONISTA_FULFILLED': {
        return {...state, listaCaronista: action.payload.data}
      }
      case 'LOAD_CARONA_BY_EMAIL_FULFILLED': {
       return {...state, caronasbyEmail: action.payload.data}
      }
      case 'LOAD_MEMBROS_CARONA_FULFILLED': {
       return {...state, listaMembros: action.payload.data}
      }
      case 'LOAD_MEMBER_DATA_FULFILLED': {
       return {...state, members: action.payload.data}
      }
      case 'OFERECER_CARONA_FULFILLED': {
        window.displayDialog({title: 'Aviso', msg: 'Oferecimento de carona realizado!'}, '/caronas/historico')
       return state
      }
      case 'OFERECER_CARONA_REJECTED': {
        window.displayDialog({title: 'Aviso', msg: 'Erro no oferecimento de carona.'}, '/')
       return state
      }
      default: {
       return state
      }
    }
}
