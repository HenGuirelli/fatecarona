import React from 'react'
import ComponentPopUpWrapper from '../../../ComponentPopUpWrapper'
import Avaliacao from '../../../Avaliacao'

// TODO: mudar para stateless component
class FinalizeCarpool extends React.Component {
    render(){
        return (
            <ComponentPopUpWrapper open={this.props.open}>
                <Avaliacao { ...this.props } />
            </ComponentPopUpWrapper>
        )
    }
}

export default FinalizeCarpool