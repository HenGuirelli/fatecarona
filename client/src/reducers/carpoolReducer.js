export default (state={
    date: '',
    hour: '',
    destination: '',
    isWheelchairAccommodation: false,
    isSmokerAllowed: false,
    isMusicAllowed: false,
    peopleInCar: []
}, action) => {
    switch(action.type){
        case 'SET_DATE_HOUR': {
            return { ...state, ...action.payload}
        }
        case 'SET_DESTINATION': {
            return { ...state, destination: action.payload }
        }
        case 'SET_PREFERENCES': {
            return { ...state, ...action.payload }
        }
        case 'SET_PEOPLES': {
            return { ...state, peopleInCar: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}