export default (state = {
    date: '',
    hour: '',
    driver: ''
}, action) => {
    switch(action.type) {
        case 'SET_DATE_HOUR': {
            return { ...state, ...action.payload }
        }
        default: {
            return { ...state }
        }
    }
}