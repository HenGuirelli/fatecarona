import React from 'react'
import _DadosPessoais from '../../../components/perfil/DadosPessoais'

class DadosPessoais extends React.Component {
    render(){
        return <_DadosPessoais { ...this.props } />
    }
}

export default DadosPessoais