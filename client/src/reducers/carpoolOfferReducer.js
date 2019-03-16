export default (state = {
    plate: '',
    brand: '',
    model: ''
}, action) => {
    switch (action.type){
        case 'SET_CAR': {
            return { ...state, ...action.payload }
        }
        default: {
            return { ...state }
        }
    }
}