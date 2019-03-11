export default function(state ={

}, action) {
    switch(action.type){
        case 'SET_FLOW': {
            return { ...state, ...action.payload }
        }
        default:
            return state
    }
}