import React, { Fragment } from 'react'
import Rating from '../Rating';
import { OutlinedTextField, ComboBox } from '../Form/TextField'
import Button from '../Form/Button'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import RateHttp from '../../http/Rate'
import CarpoolHttp from '../../http/Carpool'
import popUp, { TIPO } from '../PopUp'
import { withRouter } from 'react-router-dom'

const maxLength = 50

class Avaliacao extends React.Component {

    constructor(props){
        super(props)
        this.currentRated = null

        this.state = {
            stars: 1,
            comment: '',
            currentLength: 0,
            btnDisabled: true,
            peopleInCar: []
        }
    }

    componentDidMount() {
        this.loadPeoplesInCar()
    }

    loadPeoplesInCar() {
        const { carpoolId } = this.props
        CarpoolHttp.getPeoplesInCarpool(carpoolId)
        .then(resolve => {
            const peopleInCar = resolve.data.peoples
            // retirar si proprio da pesquisa
            this.setState({ peopleInCar: peopleInCar.filter(people => people.email !== this.props.email) })
        })
    }

    onCommentChange = e => {
        const comment = e.target.value
        if (comment.length === maxLength + 1) return
        this.setState({ comment, currentLength: comment.length })
    }

    onComboboxChange = e => {
        if (this.state.btnDisabled){
            this.setState({ btnDisabled: false })
        }
        const { value } = e.target
        this.currentRated = value        
    }

    onCancel = () => {
        if (this.props.onCancel){
            this.props.onCancel()
        }
    }

    rate = () => {
        // TODO: loading no botão enquanto ele carrega
        const raterEmail = this.props.email
        const ratedEmail = this.currentRated
        const { comment, stars } = this.state
        RateHttp.rateUser({ raterEmail, ratedEmail, comment, stars })
        .then(resolve => {
            const result = resolve.data
            const { peopleInCar } = this.state
            //retira a pessoa que acabou de ser avaliada
            this.setState({
                peopleInCar: peopleInCar.filter(people => people.email !== ratedEmail),
                btnDisabled: true
            })
            if (this.state.peopleInCar.length === 0){
                this.finalizedRate()
            }
        })
    }

    finalizedRate = () => {
        popUp({ tipo: TIPO.SUCESSO, text: 'Obrigado por avaliar! :)' })
        .then(value => {
            this.props.history.push('/')
        })
    }

    render(){
        const { peopleInCar = [] } = this.state
        return (
            <Fragment>
                <Typography component='span' variant='h5' align='center'>
                    Avaliação
                </Typography>

                <ComboBox onChange={this.onComboboxChange} options={peopleInCar.map(item => item.name)} values={peopleInCar.map(item => item.email)} />

                <Typography component='span' variant='subheading' align='center'>
                    Avaliar pessoa
                </Typography>

                <Rating max={5} stars={this.state.stars} onClick={ star => this.setState({ stars: star + 1 }) } />
                <br />

                <Typography component='span' variant='subheading'>
                    Comentário
                </Typography>

                <OutlinedTextField multiline onChange={ this.onCommentChange } value={ this.state.comment } />

                <Typography component='span' align='right'>
                    { this.state.currentLength }/{maxLength} 
                </Typography>
                <br />
                <Button disabled={this.state.btnDisabled} onClick={ this.rate }>Avaliar</Button>
                <Button variant='outlined' onClick={ this.onCancel } > Cancelar </Button>
            </Fragment>
        )
    }
}

export default withRouter(connect(store => {
    return {
        email: store.user.email
    }
})(Avaliacao))