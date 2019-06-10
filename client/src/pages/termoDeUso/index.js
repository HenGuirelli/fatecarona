import React from 'react'
import Button from '../../components/Form/Button'

import './style.css'
import { Typography, Card, CardContent } from '@material-ui/core';

class TermoDeUso extends React.Component {

    render(){
        const { onClick } = this.props
        return (
            <Card className="wrapper-termo-de-uso">
                <CardContent>
                <div className="wrapper-termo-de-uso">
                    <div className="termo-de-uso">
                        <Typography component='span'>
                            <span className="texto">A Fatec São Caetano do Sul e os desenvolvedores não se responsabilizam por qualquer incidente que ocorra durante a carona.</span>
                        </Typography>
                        <br /> <br />
                        <Button color='primary' onClick={(e) => onClick(e)}> Aceitar </Button>
                        <Button color="primary" variant='outlined' onClick={() => window.href = '/login'}> Recusar </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
        )
    }
} 

export default TermoDeUso