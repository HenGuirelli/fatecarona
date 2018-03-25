import React, { Component } from 'react'
import Rota from '../../components/Rota'
import { connect } from 'react-redux'

const rotas = [
  {
    id: '1',
    desc: 'Meu trajeto p casa',
    origem: 'FATEC SÃO CAETANO DO SUL',
    destino : 'DIADEMA'
  },
  {
    id: '1',
    desc: 'Meu trajeto p facul',
    origem: 'DIADEMA',
    destino : 'FATEC SÃO CAETANO DO SUL'
  },
]

class Rotas extends Component{

  handleActivation = (rota) =>{
    this.props.history.push('/rotas/alterar')
  }

  render(){
    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      rotaButton:{
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        fontSize: '15px'
      }
    }

    return(
      <div className="pageBase">
        <div className="container">
            {  rotas.map((rota, key) =>
              <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <button className="btn loginBtn" onClick={() => this.handleActivation(rota)}  style={styles.rotaButton}>
                  <Rota
                    desc={rota.desc}
                    origem={rota.origem}
                    destino={rota.destino}
                    key={rota.id}
                  />
                </button>
              </div>
            )}
            <input type="button" value="ADICIONAR" className="btn loginBtn btn-block" style={styles.button}/>
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
})(Rotas)
