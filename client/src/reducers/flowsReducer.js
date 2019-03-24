export default function(state = {
    flows: []
}, action) {
    switch(action.type){
        case 'SET_FLOWS': {
            return { ...state, ...action.payload }
        }
        default: {
            return { ...state }
        }
    }
}