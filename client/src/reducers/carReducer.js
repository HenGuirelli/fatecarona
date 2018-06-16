export default function reducer(state={
    veiculo: {},
    veiculos: [],
    liftCar: {},
  }, action) {
    switch (action.type) {
       case 'ATIVAR_VEICULO':{
         return{...state, veiculo: action.payload}
       }
       case 'LOAD_CAR_FULFILLED': {
         return {...state, veiculos: action.payload.data}
       }
       case 'LOAD_CAR_BY_ID_FULFILLED':{
         return {...state, liftCar: action.payload.data[0]}
       }
       default: {
         return state
       }
    }
}
