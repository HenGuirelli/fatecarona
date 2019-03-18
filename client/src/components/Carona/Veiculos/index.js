import React from 'react'
import Section from '../Section'
import WithCars from './WithCars'
import WithoutCars from './WithoutCars'
import { connect } from 'react-redux'
import './style.css'
import CarHttp from '../../../http/Car'
import { addCar, cleanCars } from '../../../actions/carActions';
import { CircularProgress } from '@material-ui/core';

class Veiculos extends React.Component {
    state = {
        loading: true
    }

    componentDidMount(){
        this.searchCars()
    }

    setLoading = state => {        
        this.setState({ loading: state })
    } 

    searchCars = () => {
        this.setLoading(true)

        const { email } = this.props        
		CarHttp.getCars({ email })
		.then(resolve => {
			const result = resolve.data
            console.log('result carros', result)
            this.props.dispatch(cleanCars())
            result.forEach(car => {
                this.props.dispatch(addCar(car))
            })

            this.setLoading(false)
		})
		.catch(err => { /* TODO: exibir mensagem de erro */ })
	}

    render(){
        const { cars }  = this.props

        if (this.state.loading) return <CircularProgress />
        return (
            <Section title='Veículo'>
                {
                    cars  && cars.length > 0 ?
                    <WithCars cars={cars} />
                    :
                    <WithoutCars onClickAdicionarCallback={this.searchCars} />
                }
            </Section>
        )
    }
}

export default connect(store => {
    return {
        cars: store.car.cars,
        email: store.user.email
    }
})(Veiculos)