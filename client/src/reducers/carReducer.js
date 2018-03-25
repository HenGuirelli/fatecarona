export default function reducer(state={
    veiculo: {},
    veiculos: []
  }, action) {
    switch (action.type) {
       case 'ATIVAR_VEICULO':{
         return{...state, veiculo: action.payload}
       }
       case 'LOAD_CAR_FULFILLED': {
         return {...state, veiculos: action.payload.data}
       }
       default: {
         return state
       }


    }
}
