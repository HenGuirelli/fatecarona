export default function(state ={
    name: '',
    origin: '', 
    destination: '', 
    waypoints: []
}, action) {
    switch(action.type){
        case 'SET_FLOW': {
            return { ...state, ...action.payload }
        }
        default:
            return state
    }
}