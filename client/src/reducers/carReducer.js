export default function reducer(state={
	plate: '',
	brand: '',
	model: '',
	color: '',
	cars: []
  }, action) {
    switch (action.type) {
		case 'SET_CAR': {
			return { ...state, ...action.payload }
		}
		case 'ADD_CAR': {
			const cars = state.cars
			cars.push(action.payload)
			return { ...state, cars }
		}
		case 'CLEAN_CARS': {
			return { ...state, cars: action.payload }
		}
		default: {
			return state
		}
    }
}
