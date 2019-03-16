import React from 'react'
import Section from '../Section'
import WithCars from './WithCars'
import WithoutCars from './WithoutCars'
import { connect } from 'react-redux'
import './style.css'

class Veiculos extends React.Component {
    render(){
        const { cars } = this.props

        return (
            <Section title='Veículo'>
                {
                    cars  && cars.length > 0 ?
                    <WithCars cars={cars} />
                    :
                    <WithoutCars />
                }
            </Section>
        )
    }
}

export default connect()(Veiculos)