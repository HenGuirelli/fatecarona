export default function reducer(state={
		//email: undefined,
		email: 'robson',
		firebase: {},
		nick: '',
		inFatec: '',
		outFatec: '',
		phone: '',

		isDriver: false,
		CNH: '',
		typeCNH: '',
		expirationDate: ''
	}, action) {
	switch (action.type) {
		case 'SET_FIREBASE': {
			return {...state, firebase: action.payload}
		}        

		case 'SET_EMAIL': {
            return { ...state, email: action.payload }
		}

		case 'SET_PERSONAL_DATA': {
			const data = action.payload
			return { ...state, ...data }
		}

		case 'SET_DRIVER_PROFILE': {
			const data = action.payload
			return { ...state, ...data }
		}

		default: {
			return state
		}
	}
}
