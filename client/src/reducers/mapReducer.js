export default function reducer(state={
    rota: {},
  }, action) {
    switch (action.type) {
      case 'ALTERAR_ROTA':{
        return{...state, rota: action.payload}
      }
      default: {
        return state
      }
    }
}
