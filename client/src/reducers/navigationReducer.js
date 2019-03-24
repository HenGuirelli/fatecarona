export default function reducer(state={
    text: 'Home'
}, action) {
    switch(action.type){
        case 'SET_TEXT':
            return { ...state, text: action.payload }
        default:
            return state
    }
}