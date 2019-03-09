import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import Button from '../../Form/Button'
import './style.css'

const Title = ({children}) => <Typography component='span' variant='subtitle2'> { children } </Typography>
const Body = ({children, key}) => <Typography component='p' variant='subtitle1' key={key}> { children } </Typography>

class Detalhes extends React.Component {
    render(){
        const { origem, destino, pontosDeInteresse } = this.props

        return (
            <div className='detalhes-trajeto'>
                <section className='section-trajeto'>
                    <Title> ORIGEM: </Title> 
                    <Body> { origem } </Body>
                </section>

                <section className='section-trajeto'>
                    <Title> DESTINO: </Title>
                    <Body> { destino } </Body>
                </section>

                <section className='section-trajeto'>
                    <Title> PONTOS DE INTERESSE: </Title>
                    { pontosDeInteresse.map((item, index) => <div><Body key={`pnt-interesse-${index}`}> { item } </Body></div>) }
                </section>

                <section className='section-trajeto'>
                    <Button variant='outlined' className='btn'> Alterar </Button>
                    <Button variant='outlined' className='btn'> Excluir </Button>
                </section>
            </div>
        )
    }
}

export default Detalhes