import React, { Fragment } from 'react'
import CadVeiculos from '../../cadveiculos'
import PerfilMotorista from '../../../components/perfil/motorista'
import { Typography, Divider } from '@material-ui/core'
import { connect } from 'react-redux'

class DriverProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isDriver: this.props.isDriver || false
        }
    }

    handleClick = ({ isDriver }) => {
        this.setState({ isDriver })
    }

    getCarsView = () => {
        return (
            <div className='step-cad-cars'>
                <Divider />
                <Typography variant='subtitle1' component='p' align='center'>
                    Cadastrar Veiculo
                </Typography>
                <CadVeiculos withButton={this.props.withButton} trackState={this.props.carTrack} />
            </div>
        )
    }

    render (){
        return (
            <Fragment>
                <PerfilMotorista onChange={ this.handleClick } trackState={this.props.driverTrack}/>
                { this.state.isDriver ? this.getCarsView() : null }
            </Fragment>
        )
    }
}

export default connect(store => {
    return {
        isDriver: store.user.isDriver || false
    }
})(DriverProfile)