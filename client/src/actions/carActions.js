export function setCar({ plate, brand, model, color }) {
	return {
		type: 'SET_CAR',
		payload: { plate, brand, model, color }
	}
}

export function addCar({ plate, brand, model, color }) {
	return {
		type: 'ADD_CAR',
		payload: { plate, brand, model, color }
	}
}

export function cleanCars() {
	return {
		type: 'CLEAN_CARS',
		payload: []
	}
}