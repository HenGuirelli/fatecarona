export function setDateAndHour({ date, hour }) {
    return {
        type: 'SET_DATE_HOUR',
        payload: { date, hour }
    }
}

export function setDestination(destination) {
    return {
        type: 'SET_DESTINATION',
        payload: destination 
    }
}

export function setPreferences({  isWheelchairAccommodation, isSmokerAllowed, isMusicAllowed }) {
    return {
        type: 'SET_PREFERENCES',
        payload: { isWheelchairAccommodation, isSmokerAllowed, isMusicAllowed }
    }
}

export function setPeopleInCar(peoples = []) {
    return {
        type: 'SET_PEOPLES',
        payload: peoples
    }
}

export function setRepeat(repeat, weekdays) {
    return {
        type: 'SET_REPEAT',
        payload: {
            repeat,
            weekdays
        }
    }
}