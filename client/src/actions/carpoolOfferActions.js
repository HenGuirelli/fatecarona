export const setCar = ({ brand, model, plate }) => {
    return {
        type: 'SET_CAR',
        payload: { brand, model, plate }
    }
}