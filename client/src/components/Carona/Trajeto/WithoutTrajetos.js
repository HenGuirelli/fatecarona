import React, { Fragment } from 'react'
import Button from '../../Form/Button'
import AdicionarRota from '../../../pages/adicionarRota'

class WithoutTrajetos extends React.Component {
    state = {
        rotaVisible: false
    }

    handleClick = event => {
        this.setState({ rotaVisible: true })
    }

    onSaveClick = () => {
        this.setState({ rotaVisible: false })
        if (this.props.onSaveClick){
            try {
                setTimeout(this.props.onSaveClick, 1000) 
            }catch (e) { /* não explode o app caso haja uma exceção */  }
        }
    }

    render(){
        return (
            <Fragment>
                <p>Você não tem um trajeto Salvo</p>
                <AdicionarRota style={{ display: this.state.rotaVisible ? 'block' : 'none' }} onSaveClick={ this.onSaveClick } />
                <Button style={{ display: this.state.rotaVisible ? 'none' : 'block' }} onClick={ this.handleClick }>Adicionar</Button>
            </Fragment>
        )
    }
}

export default WithoutTrajetos