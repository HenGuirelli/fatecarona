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
    const { veiculos, updateView } = this.props

    return(
		<div className='list-veiculo'>
			{ veiculos.map((veiculo, index) => 
				<ExpansionPanel key={`expansion-panel-veiculo-${index}`}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<img src={CarIcon} className='avatar'/>
						<Typography component='div' align='center' className='centralize'> 
							{veiculo.brand}, {veiculo.model} 
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<DetalheVeiculo { ...veiculo } updateView={updateView}/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				)}
			
		</div>
    )
  }
}