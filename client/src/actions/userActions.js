export function setFirebase(firebase) {
	return {
		type: "SET_FIREBASE",
		payload: firebase
	}
}

export function logIn(email, password, firebase) {
	return {
		type: "USER_LOGIN",
		payload: firebase.auth().signInWithEmailAndPassword(email, password)
	}
}

export function setEmail(email) {
	return {
		type: 'SET_EMAIL',
		payload: email
	}
}

export function setUserData({ nick, inFatec, outFatec, phone }){
	return {
		type: 'SET_PERSONAL_DATA',
		payload: { nick, inFatec, outFatec, phone }
	}
}

export function setDriverProfile({ CNH, typeCNH, expirationDate, isDriver }){
	return {
		type: 'SET_DRIVER_PROFILE',
		payload: { CNH, typeCNH, expirationDate, isDriver }
	}
}