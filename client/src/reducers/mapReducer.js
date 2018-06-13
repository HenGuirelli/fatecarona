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
        window.displayDialog({title: 'Aviso', msg: 'Rota excluida.'}, '/rotas')
        return{...state, rotas: [], needLoad: true}
      }
      case 'GRAVAR_ROTA_FULFILLED':{
        window.displayDialog({title: 'Aviso', msg: 'Rota adicionada.'}, '/rotas')
        return{...state, rotas: [], needLoad: true}
      }
      case 'GRAVAR_ROTA_REJECTED':{
        window.displayDialog({title: 'Aviso', msg: 'Erro ao adicionar rota.'}, '/rotas')
        return{...state, rotas: [], needLoad: true}
      }
      default: {
        return state
      }
    }
}
