export default function reducer(state={
	plate: '',
	brand: '',
	model: '',
	color: ''
  }, action) {
    switch (action.type) {
		case 'SET_CAR': {
			return { ...state, ...action.payload }
		}
		default: {
			return state
		}
    }
}
