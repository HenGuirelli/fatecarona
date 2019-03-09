import React, { Component } from 'react'
import ListTrajetos from '../../components/Trajeto/ListTrajeto'
import Button from '../../components/Form/Button'
import './style.css'

const trajetos = [
	{
		nome: "trajeto 1",
		origem: "origem",
		destino: "destino",
		pontosDeInteresse: ["ponto 1", "ponto 2", "ponto 3"]
	},
	{
		nome: "trajeto 2",
		origem: "origem",
		destino: "destino",
		pontosDeInteresse: ["ponto 1", "ponto 2", "ponto 3"]
	},
	{
		nome: "trajeto 3",
		origem: "origem",
		destino: "destino",
		pontosDeInteresse: ["ponto 1", "ponto 2", "ponto 3"]
	}
]

class Rotas extends Component{
  render(){
    return(
		<div className='page-trajetos'>
			<ListTrajetos trajetos={trajetos}/>

			<Button onClick={() => window.location.href='/rotas/adicionar' } className='btn-adicionar'>Adicionar</Button>
		</div>
    )
  }
}

export default Rotas
