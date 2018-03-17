import React, { Component } from 'react'
import Veiculo from '../../components/Veiculo'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Veiculos extends Component{

  handleSubmit = (event) =>{
    <Link to={'/veiculos/ativar'} onClick={this.handleClose}></Link>
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
      carButton:{
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        fontSize: '15px'
      }
    }

    const veiculos = [{
      marca: 'FIAT',
      modelo: 'SIENA',
      placa : 'GHJ-8930'
    },
    {
      marca:'FIAT',
      modelo: 'PALIO',
      placa : 'SDO-2032'
    },
    {
      marca:'FIAT',
      modelo: 'UNO',
      placa : 'UNO-0101'
    }
  ]
    return(
      <div className="pageBase">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="form-group">
            {veiculos.map(veiculos =>
              <div style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <center>
                  <button className="btn loginBtn" style={styles.carButton}>
                    <Veiculo
                      marca={veiculos.marca}
                      modelo={veiculos.modelo}
                      placa={veiculos.placa}
                    />
                  </button>
                </center>
              </div>
            )}
            <input type="submit" value="ADICIONAR" className="btn loginBtn form-control" style={styles.button}/>
          </form>
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
})(Veiculos)
