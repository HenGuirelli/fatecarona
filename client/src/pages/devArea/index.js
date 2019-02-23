import React, { Fragment } from 'react'
import './style.css'

const _Header = () => <div><h1>Dev Area</h1> <span>Use essa área pra teste em desenvolvimento</span></div>

class DevArea extends React.Component {
    render(){
        return (
            <Fragment>
                <_Header />
            </Fragment>
        )
    }
}

export default DevArea
