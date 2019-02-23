import React from 'react'

class Gerenciavel extends React.Component {
    getCarPoolId = () => {
        return this.props.match.params.carpoollId
    }
}

export default Gerenciavel