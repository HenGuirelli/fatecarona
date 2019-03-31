export default (state={
    date: '',
    hour: '',
    destination: '',
    isWheelchairAccommodation: false,
    isSmokerAllowed: false,
    isMusicAllowed: false,
    peopleInCar: [],
    weekdays: {
        domingo: false, 
        segunda: false, 
        terca: false, 
        quarta: false, 
        quinta: false,
        sexta: false, 
        sabado: false,
    },
    repeat: false
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
        case 'SET_REPEAT': {
            return { ...state, repeat: action.payload.repeat }
        }
        case 'SET_WEEKDAYS': {
            return { ...state, weekdays: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}