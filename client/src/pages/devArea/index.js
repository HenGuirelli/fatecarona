import React, { Fragment } from 'react'
import './style.css'
import Rating from '../../components/Rating';

const _Header = () => <div><h1>Dev Area</h1> <span>Use essa área pra teste em desenvolvimento</span></div>

class DevArea extends React.Component {
    state = {
        star: 0
    }
    render(){
        return (
            <Fragment>
                <_Header />
                <div style={{width: '150px'}}>
                <Rating max={5} stars={this.state.star} onClick={(star) => {this.setState({ star: star + 1 }); console.log(star, typeof star) }}/>
                </div>
            </Fragment>
        )
    }
}

export default DevArea
