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