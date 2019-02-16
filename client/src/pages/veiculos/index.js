import React, { Component } from 'react'
import Veiculo from '../../components/Veiculo/ListVeiculo'
import { connect } from 'react-redux'
import { ativar, loadCar } from '../../actions/carActions'
import popUp, { TIPO } from '../../components/PopUp'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '../../components/Form/Button'
import './style.css'

const veiculos = [
  {
    marca: 'fiat',
    modelo: 'palio',
    placa: 'abc-1234'
  },
  {
    marca: 'fiat',
    modelo: 'palio',
    placa: 'abc-1234'
  },
  {
    marca: 'fiat',
    modelo: 'palio',
    placa: 'abc-1234'
  }
]

class Veiculos extends Component{

  handleActivation = (car) => {
    this.props.dispatch(ativar(car));
    this.props.history.push('/veiculos/ativar')
  }

  handleSubmit = () => {
    if (this.props.userData.cnh !== null)
      this.props.history.push('/veiculos/cadastrar')
    else {
      popUp({tipo: TIPO.AVISO, text: "Para cadastrar um veículo é necessário cadastrar o número da CNH"}, '/perfil')
    }
  }

  componentWillMount() {
    //this.props.dispatch(loadCar(this.props.userData.email))
  }


  render(){
    return (
      <div className='page-veiculos'>
        <Veiculo veiculos={veiculos} />
        <center>
          <Button className='btn-adicionar'> Adicionar </Button>
        </center>
      </div>
    )      
    }
  }


export default Veiculos
