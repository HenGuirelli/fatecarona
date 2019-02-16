import React, { Component, Fragment } from 'react'
import CarIcon  from './veiculo_preto.png'
import DetalheVeiculo from '../Detalhes'
import './style.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export default class Veiculo extends Component {
  state = {
    selected: -1
  }

  render() {
    const { veiculos } = this.props

    return(
		<div className='list-veiculo'>
			{ veiculos.map((veiculo, index) => 
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<img src={CarIcon} className='avatar'/>
						<Typography component='div' align='center' className='centralize'> 
							{veiculo.marca}, {veiculo.modelo} 
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<DetalheVeiculo marca={veiculo.marca} modelo={veiculo.modelo} placa={veiculo.placa}/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				)}
			
		</div>
    )
  }
}