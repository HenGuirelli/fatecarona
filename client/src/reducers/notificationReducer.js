export default function reducer(state={
    number: 0
}, action) {
    switch(action.type){
        case 'NUMBER_NOTIFICATION':
            return { ...state, number: action.payload }
        default:
            return state
    }
}