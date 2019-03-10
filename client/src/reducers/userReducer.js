export default function reducer(state={
		//email: undefined,
		email: 'henrique.guirelli',
		firebase: {},
	}, action) {
	switch (action.type) {
		case 'SET_FIREBASE': {
			return {...state, firebase: action.payload}
		}        
		
		case 'SET_EMAIL': {
            return { ...state, email: action.payload }
        }

		default: {
			return state
		}
	}
}
