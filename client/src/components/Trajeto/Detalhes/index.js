import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import Button from '../../Form/Button'
import './style.css'
import Flow from '../../../http/Flow'
import PopUp, { TIPO } from '../../PopUp'

const Title = ({children}) => <Typography component='span' variant='subtitle2'> { children } </Typography>
const Body = ({children, key}) => <Typography component='p' variant='subtitle1' key={key}> { children } </Typography>

class Detalhes extends React.Component {

    deleteFlow = () => {
        Flow.deleteFlow({ id: this.props.id })
        .then(resolve => {
            const result = resolve.data
            if (result.success){
				PopUp({ tipo: TIPO.SUCESSO, text: 'Trajeto deletado'})
                this.actionAfterClick()
			}else{
				PopUp({ tipo: TIPO.ERROR, text: result.message })
                this.actionAfterClick()
            }
        })
    }

    actionAfterClick = () => {
        if (this.props.actionAfterClick){
            this.props.actionAfterClick()
        }
    }

    updateFlow = () => {        
        this.actionAfterClick()
    }

    render(){
        const { origin, destination, waypoints } = this.props
        return (
            <div className='detalhes-trajeto'>
                <section className='section-trajeto'>
                    <Title> ORIGEM: </Title> 
                    <Body> { origin } </Body>
                </section>

                <section className='section-trajeto'>
                    <Title> DESTINO: </Title>
                    <Body> { destination } </Body>
                </section>

                { waypoints && waypoints.length > 0 ? 
                    <section className='section-trajeto'>
                        <Title> PONTOS DE INTERESSE: </Title>
                        { waypoints.map((item, index) => <div><Body key={`pnt-interesse-${index}`}> { item } </Body></div>) }
                    </section> 
                    : 
                    null 
                }

                <section className='section-trajeto'>
                    <Button variant='outlined' className='btn' onClick={this.deleteFlow}> Excluir </Button>
                </section>
            </div>
        )
    }
}

export default Detalhes