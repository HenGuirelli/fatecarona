import React from 'react'
import ProfileHttp from '../../../http/Profile'
import CarpoolHttp from '../../../http/Carpool'
import { typeCarpool } from '../../../enuns'

class Gerenciavel extends React.Component {
    _isMounted = false
    constructor(props){
        super(props)

        const details = {
            status: '',
            day: '',
            hour: '',
            destination: ''
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
        console.log('chamou func')
        const resolve = await CarpoolHttp.getCarpoolById(this.getCarPoolId())
        const result = resolve.data.carpool
        if (resolve.data.success){
            const { car, riders } = result

            const details = {
                status: result.status,
                date: result.date,
                hour: result.hour,
                destination: result.destination
            }
            const carpoolPreferences = {
                isSmokerAllowed: result.isSmokerAllowed,
                isWheelchairAccommodation: result.isWheelchairAccommodation,
                isMusicAllowed: result.isMusicAllowed
            }
            console.log('state chamado')
            this._isMounted && this.setState({ details, car, peopleInCar: riders, carpoolPreferences })

            const profileResolve = await ProfileHttp.getProfileData({ email: this.props.email })
            const { success, ...profile } = profileResolve.data
            if (success){
                riders.push({ ...profile, type: typeCarpool.DRIVER })
                riders.reverse()
                this.setState({ peopleInCar: riders })
            }
        }
    }
}

export default Gerenciavel