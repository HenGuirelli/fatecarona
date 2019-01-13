import popUp, { TIPO } from '../components/PopUp'

export default function reducer(state={
    rota: {},
    rotas: [],
    needLoad: true
  }, action) {
    switch (action.type) {
      case 'ALTERAR_ROTA':{
        return{...state, rota: action.payload, needLoad: true}
      }
      case 'BUSCAR_ROTAS_FULFILLED':{
        return{...state, rotas: action.payload.data, needLoad: false}
      }
      case 'EXCLUIR_ROTA_FULFILLED':{
        popUp({tipo: TIPO.AVISO, text: 'Rota excluida.'}, '/rotas')
        return{...state, rotas: [], needLoad: true}
      }
      case 'GRAVAR_ROTA_FULFILLED':{
        popUp({tipo: TIPO.AVISO, text: 'Rota adicionada.'}, '/rotas')
        return{...state, rotas: [], needLoad: true}
      }
      case 'GRAVAR_ROTA_REJECTED':{
        popUp({tipo: TIPO.AVISO, text: 'Erro ao adicionar rota.'}, '/rotas')
        return{...state, rotas: [], needLoad: true}
      }
      default: {
        return state
      }
    }
}
