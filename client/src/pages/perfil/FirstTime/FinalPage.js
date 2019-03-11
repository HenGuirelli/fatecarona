import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Redirect } from 'react-router-dom'

class FinalPage extends React.Component {
    state = {
        complete: 0
    }

    componentDidMount(){
        setInterval(() => {
            this.setState({ complete: this.state.complete + 10})
        }, 200)
    }

    render(){
        if (this.state.complete >= 110)
            return <Redirect to='/' />

        return (
            <div>
                <h1>Perfil atualizado</h1>
                <LinearProgress
                    variant='determinate'
                    value={this.state.complete}
                />
            </div>
        )
    }
}

export default FinalPage