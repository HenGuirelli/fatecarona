import React from 'react'
import CadastrarVeiculo from '../../Veiculo/CadastrarVeiculo'
import Button from '../../Form/Button'
import { connect } from 'react-redux'
import './style.css'


class WithoutCars extends React.Component {
    state = {
        visible: false
    }

    onClickAdicionarCallback = () => {
        this.setState({ visible: false })
        if (this.props.onClickAdicionarCallback){
            this.props.onClickAdicionarCallback()
        }
    }

    render(){
        const { visible } = this.state
        return (
            <div>
                <p>Você não possuiu nenhum veiculo cadastrado</p>
                <CadastrarVeiculo style={{ display: visible ? 'block' : 'none' }} onClickAdicionarCallback={ this.onClickAdicionarCallback }/>
                <Button style={{ display: visible ? 'none' : 'block' }} onClick={() => this.setState({ visible: true })}> Adicionar </Button>
            </div>
        )
    }
}

export default WithoutCars
