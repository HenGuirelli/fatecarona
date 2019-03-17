import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfoCarona from '../../components/InfoCarona'

const _carpools = [
	{
		"_id": "5c8d77b6b862203c24b5a713",
		"date": "2010-10-10",
		"hour": "10:01",
		"isSmokerAllowed": false,
		"isMusicAllowed": false,
		"isWheelchairAccommodation": false,
		"status": "PENDING",
		"email": "henrique.guirelli",
		"id": 15,
		"flow": {
		  "_id": "5c8d75784968b938805f2566",
		  "name": "rota",
		  "origin": "Arizona, EUA",
		  "destination": "Geórgia, EUA",
		  "waypoints": [
			"Houston, TX, EUA",
			"Houston, TX, EUA"
		  ],
		  "email": "henrique.guirelli",
		  "id": 6
		},
		"car": {
		  "_id": "5c8d75ab4968b938805f2567",
		  "plate": "kkk",
		  "brand": "asdasdasdasdas",
		  "model": "dasdasdasdasdasdasdsa",
		  "color": "aaa",
		  "email": "henrique.guirelli"
		},
		"destination": "TO_FATEC",
		"riders": []
	  },
	  {
		"_id": "5c8d77b6b862203c24b5a713",
		"date": "2010-10-10",
		"hour": "10:01",
		"isSmokerAllowed": false,
		"isMusicAllowed": false,
		"isWheelchairAccommodation": false,
		"status": "PENDING",
		"email": "henrique.guirelli",
		"id": 15,
		"flow": {
		  "_id": "5c8d75784968b938805f2566",
		  "name": "rota",
		  "origin": "Arizona, EUA",
		  "destination": "Geórgia, EUA",
		  "waypoints": [
			"Houston, TX, EUA",
			"Houston, TX, EUA"
		  ],
		  "email": "henrique.guirelli",
		  "id": 6
		},
		"car": {
		  "_id": "5c8d75ab4968b938805f2567",
		  "plate": "kkk",
		  "brand": "asdasdasdasdas",
		  "model": "dasdasdasdasdasdasdsa",
		  "color": "aaa",
		  "email": "henrique.guirelli"
		},
		"destination": "TO_FATEC",
		"riders": []
	  }
]

class ResultCaronas extends Component {

	render() {
		const carpools = this.props.carpools || _carpools
		return (
			<div>
				{ carpools.map((lift, key) => <InfoCarona key={key} carpool={lift} />)}
			</div>
		)
	}
}

export default connect(store => {
	return {
		carpools: store.carpool.matches
	}
})(ResultCaronas)
