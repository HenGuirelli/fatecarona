export default function reducer(state={
    veiculo: {}
  }, action) {
    switch (action.type) {
       case "ATIVAR_VEICULO":{
         return{...state, veiculo: action.payload}

       }
       default: {
         return state
       }


    }
}
