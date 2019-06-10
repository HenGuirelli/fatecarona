import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrajetoIcon  from '../../images/trajeto.png'
import { excluirRota } from '../../actions/mapActions'
import GoogleMaps from '../../components/GoogleMaps'

class AlterarRota extends Component{

  handleDelete = () => {
    this.props.dispatch(excluirRota(this.props.rota._id))
  }

  handleAlter = () => {
    this.props.history.push('/rotas/adicionar')
  }

  saveFunc = f => {
    this.displayRoute = f;
  }

  componentDidMount() {
    let rota = this.props.rota.rota
    if (rota) {
      this.displayRoute({
        origin: rota.origin,
        destination: rota.destination,
        waypoints: rota.waypoints
      })
    }
  }

  render(){
    const { rota } = this.props;

    const styles = {
      textMargin:{
        marginTop: '2em'
      },
      textBold:{
        fontWeight: 'bold'
      },
      btn:{
        fontSize: '14px',
        fontWeight: 'bold',
        width: '100%',
        backgroundColor: '#6E4D8B',
        borderColor: '#6E4D8B',
        margin: '25px 0'
      },
      btnContainer: {
        padding:  '0 10px',
      },
    };

    if (!rota.rota) return null

    return(
      <div className="pageBase">
        <div className="container">
          <div className="form-group">
            <center>
              <div style={{marginTop: '7em'}}>
                <img style={{width: '3.7em', height: '4em', margin:'0'}} src={TrajetoIcon} alt={"Trajeto Logo"}/>
              </div>
              <div style={styles.textMargin}>
                {rota.nomeRota}
              </div>
              <div style={styles.textMargin}>ORIGEM:</div>
              <div style={styles.textBold}>{rota.rota.origin}</div>
              <div style={styles.textMargin}>DESTINO:</div>
              <div style={styles.textBold}>{rota.rota.destination}</div>

              <div>
                <input
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  value="Pontos de Interesse"
                  className="btn btn-primary"
                  style={styles.btn}
                />
              </div>
              <div className="collapse" id="collapseExample" style={{paddingBottom: '25px'}}>
                <ul className="list-group">
                  {rota.rota.waypoints ? rota.rota.waypoints.map((point, key) => <li className="list-group-item" key={key}>{point.location.query}</li>) : null}
                </ul>
              </div>
            </center>
            <GoogleMaps callback={this.saveFunc} />
            <div  className="row">
                <div className="col-6" style={styles.btnContainer}>
                    <input type="button" value="Alterar" className="btn btn-primary" style={styles.btn} onClick={this.handleAlter}/>
                </div>
                <div className="col-6" style={styles.btnContainer}>
                <input type="button" value="Excluir" className="btn btn-primary" style={styles.btn} onClick={this.handleDelete}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    rota: store.map.rota
  }
})(AlterarRota)
