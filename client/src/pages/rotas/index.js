import React, { Component } from 'react'
import Rota from '../../components/Rota'
import { connect } from 'react-redux'
import { alteraRota, buscarRotas } from '../../actions/mapActions'

class Rotas extends Component{

  handleActivation = (rota) =>{
    this.props.dispatch(alteraRota(rota));
    this.props.history.push('/rotas/alterar')
  }

  handleSubmit = () =>{
    this.props.history.push('/rotas/adicionar')
  }

  render(){
    const { rotas, userData, needLoad } = this.props

    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '20px',
        width: '70%',
        marginLeft: '15%'
      },
      rotaButton:{
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        fontSize: '15px'
      }
    }

    if (userData.email && needLoad) this.props.dispatch(buscarRotas(userData.email))

    return(
      <div className="pageBase">
        <div className="container">
            { rotas.length > 0 ? rotas.map((rota, key) =>
              <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <button className="btn loginBtn" onClick={() => this.handleActivation(rota)}  style={styles.rotaButton}>
                  <Rota
                    desc={rota.nomeRota}
                    key={rota._id}
                  />
                </button>
              </div>
            ) : null}
            <input type="button" onClick={this.handleSubmit} value="Adicionar" className="btn loginBtn btn-block" style={styles.button}/>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    rotas: store.map.rotas,
    needLoad: store.map.needLoad
  }
})(Rotas)
