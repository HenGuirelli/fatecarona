export const setDateAndHour = ({ date, hour }) => {
    return {
        type: 'SET_DATE_HOUR',
        payload: { date, hour }
    }
}