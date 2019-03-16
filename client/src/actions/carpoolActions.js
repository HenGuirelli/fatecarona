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