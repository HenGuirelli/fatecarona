import React from 'react'
import CarpoolHttp from '../../../http/Carpool'
import { setPeopleInCar } from '../../../actions/carpoolActions'

class Gerenciavel extends React.Component {
    _isMounted = false
    constructor(props){
        super(props)

        const details = {
            status: '',
            day: '',
            hour: '',
            destination: '',
            repeat: false,
            weekdays: []
        }

        const carpoolPreferences = {
            isSmokerAllowed: false,
            isWheelchairAccommodation: false,
            isMusicAllowed: false
        }

        const car = {
            brand: '',
            model: '',
            plate: ''
        }

        const peopleInCar = []

        this.state = {
            details,
            carpoolPreferences,
            car,
            peopleInCar
        }
    }

    _componentDidMount(){
        this._isMounted = true
    }

    _componentWillUnmount(){
        this._isMounted = false
    }

    getCarPoolId = () => {
        return this.props.match.params.carpoolId
    }

    loadInformation = async () => {
        const resolve = await CarpoolHttp.getCarpoolById(this.getCarPoolId())
        const result = resolve.data.carpool
        if (resolve.data.success){
            const { car, riders } = result
            const details = {
                status: result.status,
                date: result.date,
                hour: result.hour,
                destination: result.destination,
                repeat: result.repeat,
                weekdays: result.weekdays
            }
            const carpoolPreferences = {
                isSmokerAllowed: result.isSmokerAllowed,
                isWheelchairAccommodation: result.isWheelchairAccommodation,
                isMusicAllowed: result.isMusicAllowed
            }
            this._isMounted && this.setState({ details, car, carpoolPreferences })

            CarpoolHttp.getPeoplesInCarpool(this.getCarPoolId())
            .then(resolve => {
                const peopleInCar = resolve.data.peoples
                this._isMounted && this.setState({ peopleInCar })
            })
        }
    }
}

export default Gerenciavel