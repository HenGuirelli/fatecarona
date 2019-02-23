import React from 'react'
import Gerenciavel from '../index'

class Andamento extends Gerenciavel {
    render(){
        console.log(this.getCarPoolId())
        return (
             'nada'
        )
    }
}

export default Andamento