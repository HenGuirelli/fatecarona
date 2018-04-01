import React, { Component } from 'react'
import LiftRating from '../../components/LiftRating'
//import LiftMgt from '../../components/LiftMgt'
import LiftPend from '../../components/LiftPend'
import { connect } from 'react-redux'

class Caronas extends Component {

  /*
    <LiftMgt
      userData={userData}
      text="Vai pegar carona com BIANCA em 28/02/2018 saindo da FATEC."
    />

    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <div className="row btn-group" style={{width: '100%', marginLeft: 0}}>
        <input type="button" className="btnLift col-4" value="EM ANDAMENTO" />
        <input type="button" className="btnLift col-4" value="HISTÓRICO" />
        <input type="button" className="btnLift col-4" value="PENDENTES" />
      </div>
  */
  render() {
    //const { userData } = this.props
    window.comp = LiftRating

    return (
      <div>

        <div className="row btn-group btn-group-toggle" style={{width:'100%'}} data-toggle="buttons">
          <label className="btn btnLift col-4">
            <input type="radio" name="options" id="option1" autocomplete="off"/> EM ANDAMENTO
          </label>
          <label className="btn btnLift col-4">
            <input type="radio" name="options" id="option2" autocomplete="off"/> HISTÓRICO
          </label>
          <label className="btn btnLift col-4">
            <input type="radio" name="options" id="option3" autocomplete="off"/> PENDENTE
          </label>
        </div>

        <div className="container">
          <div className="row" >
            <LiftPend
              dia= "01/04/2018"
              hora="12:00"
              tipo="SAINDO DA FATEC"

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
