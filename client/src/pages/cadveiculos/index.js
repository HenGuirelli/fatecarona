import React, { Component } from 'react'
import { connect } from 'react-redux'
import PassgIcon from '../../components/Veiculo/lugares_roxo.png'


class CadVeiculos extends Component{
  render(){
    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '15px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      inputText: {
        borderRadius: '10px',
        borderWidth: '1.5px',
        borderColor: '#6E4D8B',
        width: '8em',
        textAlign:'center'
      },
      inputOption: {
        width: '80%',
        borderRadius: '7px',
        borderWidth: '1px',
        borderColor: '#6E4D8B'
      },
      inputNumber: {
        width: '10em',
      },
      borderNumber:{
        borderRadius: '7px',
        borderWidth: '1px',
        borderColor: '#6E4D8B',
        textAlign: 'center',
        width: '5em'
      }
    }
    return(
      <div className="pageBase">
        <div className="container">
          <form className="form-group">
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">PLACA</div>
                <input
                  placeholder='AAA-0000'
                  style={styles.inputText}
                  className="form-control"
                />
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MARCA</div>
                <select className="form-control" style={styles.inputOption} defaultValue="default">
                  <option value="default">Selecione...</option>
                  <option>FIAT</option>
                  <option>MERCEDES</option>
                </select>
              </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
              <center>
                <div className="col-6">MODELO</div>
                  <select className="form-control" style={styles.inputOption} defaultValue="default">
                    <option value="default">Selecione...</option>
                    <option>SIENA</option>
                    <option>PALIO</option>
                  </select>
                </center>
            </div>
            <div style={{padding: '2em 0', margin: '0 1px', borderBottom: '2px solid grey'}}>
                <center>
                  <div>LUGARES DISPONÍVEIS</div>
                  <div className="input-group" style={styles.inputNumber}>
                    <div>
                        <img src={PassgIcon} alt={"Passageiro Icon"} color="#6E4D8B" style={{width: '1.5em', height: '1.8em', margin:' 3px 10px'}}/>
                    </div>
                    <div>
                      <input type="number" name="quantity" min="1" max="10" placeholder="1"  style={styles.borderNumber} className="form-control"/>
                    </div>
                  </div>
                </center>
            </div>
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
})(CadVeiculos)
