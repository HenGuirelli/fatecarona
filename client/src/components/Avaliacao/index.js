import React from 'react'
import Rating from '../Rating';
import ComponentPopUpWrapper from '../ComponentPopUpWrapper'


class Avaliacao extends React.Component {
    state = {
        stars: 0
    }

    render(){
        return (
            <ComponentPopUpWrapper open={true}>
                <Rating max={5} stars={this.state.stars} onClick={ star => console.log('estrela clicada:', star) }/>
            </ComponentPopUpWrapper>
        )
    }
}

export default Avaliacao