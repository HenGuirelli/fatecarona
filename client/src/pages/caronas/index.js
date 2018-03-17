import React, { Component } from 'react'
import LiftRating from '../../components/LiftRating'
import LiftMgt from '../../components/LiftMgt'
import { connect } from 'react-redux'

class Caronas extends Component {
  render() {
    const { userData } = this.props
    window.comp = LiftRating
    return (
      <div>
        <div className="row btn-group" style={{width: '100%', marginLeft: 0}}>
          <input type="button" className="btnLift col-4" value="ATIVAS" />
          <input type="button" className="btnLift col-4" value="FINALIZADAS" />
          <input type="button" className="btnLift col-4" value="PENDENTES" />
        </div>
        <div className="container">
          <div className="row">
            <LiftRating 
              userData={userData} 
              name="Thiago" 
              rating={4} 
              text="I don't like this"
            />
          </div>
          <div className="row">
            <LiftMgt
              userData={userData} 
              text="Vai pegar carona com BIANCA em 28/02/2018 saindo da FATEC."
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData
  }
})(Caronas)