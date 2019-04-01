import React, { Component, Fragment } from 'react'
import GoogleMaps from '../../components/_GoogleMaps'
import { OutlinedTextField } from '../../components/Form/TextField'
import CustomTable from '../../components/Table'
import Button from '../../components/Form/Button'
import './style.css'
import { connect } from 'react-redux'
import Flow from '../../http/Flow'
import PopUp, { TIPO } from '../../components/PopUp'
import { CircularProgress } from '@material-ui/core'
import { sleep } from '../../utils'

class AdicionarRota extends Component {
	constructor(props) {
		super(props)
		this.waypoints = []
		this.state = {
			txtOrigem : undefined,
			txtDestino: undefined,
			txtPontosInteresses: undefined,
			data: [],
			waypoints: [],
			name: '',
			origin: '',
			destination: '',
			waypoint: '',
			loading: true
		}
		this.trackState = {}
		this.setRoute = () => console.error('setRouter() não atribuido')
	}

	addWaypoint = event => {
		const value = this.state.txtPontosInteresses.value
		if (value){
			this.state.data.push([value])
			this.state.waypoints.push(value)
			this.setState({ data: this.state.data, waypoint: '' })
			return true
		}
	}

	setLoading = loading => this.setState({ loading })

	async componentDidMount() {
		this.setLoading(true)
		while(!(await this.tryBindTextsFields())){
			console.log('não conseguiu bindar')
			await sleep(1000)
			console.log('tentando dnv')
			console.log(this.state)
		}
		this.setLoading(false)
	}

	tryBindTextsFields = async () => {
		const { txtOrigem, txtDestino, txtPontosInteresses } = this.state
		try {
			if (!txtOrigem || !txtDestino || !txtPontosInteresses){
				return false
			}
			this.bindAutoComplete('origin', txtOrigem)
			this.bindAutoComplete('destination', txtDestino)
			this.bindAutoComplete('waypoint', txtPontosInteresses)
			return true
		} catch (e) {
			console.error(e.toString())
			return false 
		}
	}

	bindAutoComplete(name, element) {
		console.log(element)
		const autocomplete = new window.google.maps.places.Autocomplete(element)
		autocomplete.addListener('place_changed', () => this.handleChange(name, autocomplete.getPlace().formatted_address))
	}

	handleChange = (name, value) => {
		this.trackState[name] = value

		if (name === 'waypoint'){
			this.trackState[name] = this.state.waypoints
		}
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }
		this.setState({ [name]: value })
	}

	getValues = () => {
		return {
			origin: this.state.txtOrigem.value,
			destination: this.state.txtDestino.value,
			name: this.state.name,
			waypoints: this.state.waypoints,
			email: this.props.email
		}
	}

	handleClick = event => {
		const data = this.getValues()

		Flow.createNewFlow({ ...data })
		.then(resolve => {
			const result = resolve.data

			if (result.success){
				PopUp({ tipo: TIPO.SUCESSO, text: 'Trajeto cadastrado'})
			}else{
				PopUp({ tipo: TIPO.ERROR, text: result.message })
			}
		})
		// action click
		if (this.props.onSaveClick) this.props.onSaveClick(event)
	}

	mapGoogleMapsPropsToFunc = (setRoute) => {
		this.setRoute = setRoute
	}

	renderMap = () => {
		const { txtDestino, txtOrigem, waypoints } = this.state
		if (txtDestino && txtOrigem)
		this.setRoute(txtOrigem.value, txtDestino.value)
	}

	render () {
		const { withButton = true, ...restProps } = this.props
		const { loading } = this.state

		return (
			<Fragment>
				{ loading ? <CircularProgress /> : null }
				<main className='root-adicionar-rota' {...restProps} style={{visibility: loading ? 'hidden' : 'visible'}}>
					<div className='adicionar-rota'>
						<div className='wrap'>
							<OutlinedTextField label='Nome da Rota' block className='component' 
								onChange={ (event) => this.handleChange('name', event.target.value) } />

							<OutlinedTextField label='Origem' inputRef={el => this.state.txtOrigem = el} block className='component' 
								onChange={ (event) => this.handleChange('origin', event.target.value)} value={this.state.origin} 
								onBlur={this.renderMap} />							
							<OutlinedTextField label='Destino' inputRef={el => this.state.txtDestino = el} block className='component' 
								onChange={ (event) => this.handleChange('destination', event.target.value)} value={this.state.destination}
								onBlur={this.renderMap} />

							<div className='add-waypoints'>
								<OutlinedTextField label='Pontos de interesse' inputRef={el => this.state.txtPontosInteresses = el} block  className='component'
									onChange={ (event) => this.handleChange('waypoint', event.target.value)} value={this.state.waypoint} />
								<Button onClick={() => this.addWaypoint() && this.renderMap() } className='btn-add-flow'> Adicionar </Button>
							</div>
						</div>
					</div>
					<CustomTable data={this.state.data} header={['Pontos de Interesse']} className='component' />
					{ withButton ? <Button className='component' onClick={this.handleClick}> Salvar </Button> : null }
					<GoogleMaps routeState={ () => { console.log('callback routeState') }} callback={ this.mapGoogleMapsPropsToFunc } />
				</main>
			</Fragment>
		)
	}
}

export default connect(store => {
	return {
		email: store.user.email,
		name: store.flow.name,
		origin: store.flow.origin,
		destination: store.flow.destination,
		waypoints: store.flow.waypoints
	}
})(AdicionarRota)
