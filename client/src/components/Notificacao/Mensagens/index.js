import React from 'react'
import Table from '../../Table'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';

const Notificacao = props => (
    <div>
        <Typography component='p' variant='h6' align='left'>
            { props.title }
        </Typography>

        <Typography component='p' variant='subtitle1' align='left'>
            { props.text }
        </Typography>
    </div>
)

class Mensagens extends React.Component {

    fetchData = data => {
        return data.map(item => [<Link to='/'><Notificacao {...item} /></Link>])
    }

    render(){
        const { data } = this.props
        return (
            <Table data={this.fetchData(data)}/>
        )
    }
}

export default Mensagens