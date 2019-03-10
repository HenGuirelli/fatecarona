import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DetalhesTrajeto from '../Detalhes'
import TrajetoIcon from './trajeto.png'
import './style.css'

class ListTrajetos extends React.Component {
    render(){
        const { trajetos, actionAfterClick } = this.props
        return (
        <div className='list-trajeto'>
			{ trajetos.map((trajeto, index) => 
				<ExpansionPanel key={`expansion-panel-flow-${index}`}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<img src={TrajetoIcon} className='avatar'/>
						<Typography component='div' align='center' className='centralize'> 
							{ trajeto.name } 
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<DetalhesTrajeto { ...trajeto } actionAfterClick={actionAfterClick} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				)}
		</div>
        )
    }
}

export default ListTrajetos