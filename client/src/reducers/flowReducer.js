export default function(state ={
    name: '',
    origin: '', 
    destination: '',
    id: -1,
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