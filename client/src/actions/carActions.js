export function setCar({ plate, brand, model, color }) {
	return {
		type: 'SET_CAR',
		payload: { plate, brand, model, color }
	}
}