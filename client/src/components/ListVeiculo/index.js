import React, { Component } from 'react'
import CarIcon  from './veiculo_preto.png'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import './style.css'

export default class Veiculo extends Component {
  state = {
    selected: -1
  }

  render() {
    const { veiculos } = this.props
    const { marca, modelo, placa, ativo } = this.props

    return(
      <List dense={false} className='list-veiculo'>
        { veiculos.map((veiculos, index) => 
          <ListItem 
            key={`list-item-veiculo-${index}`} 
            selected={this.state.selected === index} 
            onClick={() => this.setState({ selected: index })}
            className='item'
            >
            <ListItemAvatar>
              <img src={CarIcon} className='avatar'/>
            </ListItemAvatar>
            <ListItemText
              primary={`${veiculos.marca}, ${veiculos.modelo}`}
              secondary={veiculos.placa}
            />
          </ListItem>,
        )}
    </List>
    )
  }
}
