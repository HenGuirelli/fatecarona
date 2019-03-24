import React from 'react'
import CarIconUnSelected from '../../../images/veiculo_preto.png'
import CarIconSelected from '../../../images/veiculo_branco.png'
import { connect } from 'react-redux'
import './style.css'
import { setCar } from '../../../actions/carActions'

class WithCars extends React.Component {
    state = {
        selected: -1
    }

    handleClick = index => {

        if (index === this.state.selected) {
            this.setState({ selected: -1 })
            this.props.dispatch(setCar({}))
        }else{
            this.setState({ selected: index })
            const { brand, model, plate } = this.props.cars[index]
            this.props.dispatch(setCar({ brand, model, plate }))
        }
    }

    render(){
        const { cars } = this.props
        const { selected } = this.state
        return (
            <div className='cars-driver-offer'>
            { 
                cars.map((veiculo, index) =>
                        <div className={`car ${index === selected ? 'selected' : 'unselected'}`} onClick={ () => this.handleClick(index) }>
                            <div className='img-wrapper'>
                                <img src={index === selected ? CarIconUnSelected : CarIconSelected} alt='foto de um carro' />
                            </div>
                            <span className='placa' style={{ color: index === selected ? 'black' : 'white' }}>
                                { veiculo.plate }
                            </span>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect()(WithCars)