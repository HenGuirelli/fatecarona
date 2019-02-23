import React from 'react'
import Table from '../../Table'

const Notificacao = props => (
    <div>
        { props.title }
    </div>
)

class Caronas extends React.Component {
    fetchData = data => {
        return data.map(item => [<Notificacao title={item.title}/>])
    }

    render(){
        const { data } = this.props
        return (
            <Table data={this.fetchData(data)}/>
        )
    }
}

export default Caronas