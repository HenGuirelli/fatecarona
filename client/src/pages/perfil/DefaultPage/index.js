import React, { Fragment } from 'react'
import DadosPessoais from '../../../components/perfil/DadosPessoais'
import { Divider, Typography } from '@material-ui/core'
import PerfilMotorista from '../../../components/perfil/motorista'
import Button from '../../../components/Form/Button'
import './style.css'

const DefaultPage = props => (
	<Fragment>
		<Typography component='h3' variant='h6' align='center'>
			Dados Pessoais
		</Typography>
		<DadosPessoais />
		<Divider />
		
		<Typography component='h3' variant='h6' align='center'>
			Dados de Motorista
		</Typography>
		<PerfilMotorista />

        <Divider />
        <Typography component='div' align='center' className='defaul-page-btn-adicionar-wrapper'>
            <Button className='defaul-page-btn-adicionar'> Salvar </Button>
        </Typography>
	</Fragment>
)

export default DefaultPage