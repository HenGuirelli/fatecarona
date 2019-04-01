import React, { Fragment } from 'react'
import './style.css'
import Rating from '../../components/Rating';
import { ComboBox } from '../../components/Form/TextField'

import GoogleMaps from '../../components/_GoogleMaps'
const _Header = () => <div><h1>Dev Area</h1> <span>Use essa área pra teste em desenvolvimento</span></div>

class DevArea extends React.Component {
    state = {
        star: 0,
        setRoute: undefined
    }

    testeMapa = () => {
        var haight = new window.google.maps.LatLng(37.7699298, -122.4469157);
        var oceanBeach = new window.google.maps.LatLng(37.7683909618184, -122.51089453697205);
        this.state.setRoute(haight, oceanBeach)
    }

    callback = (setRoute, b, c) => {
        this.state.setRoute = setRoute
    }

    render(){
        return (
            <Fragment>
                <_Header />
                <div style={{width: '150px'}}>
                <Rating max={5} stars={this.state.star} onClick={(star) => {this.setState({ star: star + 1 }); console.log(star, typeof star) }}/>
                </div>

                <ComboBox label='teste combobox'/>
                <GoogleMaps routeState={()=>console.log('routeState')} callback={this.callback} />
                <button onClick={this.testeMapa}>Testar Mapa</button>
            </Fragment>
        )
    }
}

export default DevArea
