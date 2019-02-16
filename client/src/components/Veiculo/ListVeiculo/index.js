import React, { Component, Fragment } from 'react'
import CarIcon  from './veiculo_preto.png'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DetalheVeiculo from '../Detalhes'
import './style.css'
import ComponentPopUpWrapper from '../../ComponentPopUpWrapper'
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
/*
<List dense={false} className='list-veiculo'>
			{ veiculos.map((veiculos, index) =>
			<Fragment>
				<ComponentPopUpWrapper  open={this.state.selected === index}
				onBackgroundClick={() => this.setState({ selected: -1 })}>
					<DetalheVeiculo marca={veiculos.marca} modelo={veiculos.modelo} placa={veiculos.placa}/>
				</ComponentPopUpWrapper>
				<ListItem 
					key={`list-item-veiculo-${index}`} 
					selected={this.state.selected === index} 
					onClick={() => {
						this.setState({ selected: index })
					}}
					className='item'
					>
					<ListItemAvatar>
						<img src={CarIcon} className='avatar'/>
					</ListItemAvatar>
					<ListItemText
						primary={`${veiculos.marca}, ${veiculos.modelo}`}
						secondary={veiculos.placa}
					/>
				</ListItem>
			</Fragment>
			)}
		</List> */