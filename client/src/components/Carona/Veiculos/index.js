import React from 'react'
import Section from '../Section'
import CarIconUnSelected from '../../../images/veiculo_preto.png'
import CarIconSelected from '../../../images/veiculo_branco.png'
import CadastrarVeiculo from '../../Veiculo/CadastrarVeiculo'
import Button from '../../Form/Button'
import './style.css'

class WithCars extends React.Component {
    state = {
        selected: -1
    }

    render(){
        const { veiculos } = this.props
        const { selected } = this.state

        return (
            <div className='cars-driver-offer'>
            { 
                veiculos.map((veiculo, index) =>
                        <div className={`car ${index === selected ? 'selected' : 'unselected'}`} onClick={() => this.setState({ selected: index })}>
                            <div className='img-wrapper'>
                                <img src={index === selected ? CarIconUnSelected : CarIconSelected} alt='foto de um carro' />
                            </div>
                            <span className='placa' style={{ color: index === selected ? 'black' : 'white' }}>
                                { veiculo.placa }
                            </span>
                        </div>
                    )
                }
            </div>
        )
    }
}

class WithoutCars extends React.Component {
    state = {
        visible: false
    }

    render(){
        const { visible } = this.state
        return (
            <div>
                <p>Você Não possuiu nenhum veiculo cadastrado</p>
                <CadastrarVeiculo style={{ display: visible ? 'block' : 'none' }} onClickAdicionarCallback={() => this.setState({ visible: false })}/>
                <Button style={{ display: visible ? 'none' : 'block' }} onClick={() => this.setState({ visible: true })}> Adicionar </Button>
            </div>
        )
    }
}

class Veiculos extends React.Component {
    render(){
        // const { veiculos } = this.props
        let veiculos = undefined

        return (
            <Section title='Veículo'>
                {
                    veiculos  && veiculos.length > 0 ?
                    <WithCars veiculos={veiculos} />
                    :
                    <WithoutCars />
                }
            </Section>
        )
    }
}

export default Veiculos