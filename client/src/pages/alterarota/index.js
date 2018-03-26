import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrajetoIcon  from '../../components/Rota/trajeto.png'
import Dialog from 'material-ui/Dialog'


class AlterarRota extends Component{


  constructor(props) {
    super(props);
    this.state = {
      dialog: false
    };
  }

  displayDialog(msg) {
    this.setState({dialog: true, msg})
  }

  handleClose = () => {
    this.setState({dialog: false})
    this.props.history.push('/rotas')
  }

  render(){
    const {rota} = this.props;

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

    return(
      <div className="pageBase">
        <Dialog
          actions={null}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
        {this.state.msg}
        </Dialog>
        <div className="container">
          <form className="form-group">
            <center>
            <div style={{marginTop: '7em'}}>
              <img style={{width: '3.7em', height: '4em', margin:'0'}} src={TrajetoIcon} alt={"Trajeto Logo"}/>
            </div>
            <div style={styles.textMargin}>
              {rota.desc}
            </div>
            <div style={styles.textMargin}>ORIGEM:</div>
            <div style={styles.textBold}>{rota.origem}</div>
            <div style={styles.textMargin}>DESTINO:</div>
            <div style={styles.textBold}>{rota.destino}</div>

            <div style={{width: '30%'}}>
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
            <div className="collapse" id="collapseExample">
              <select multiple className="form-control" id="exampleFormControlSelect2">
              </select>
            </div>
          </center>
            <div  className="row">
              <div className="col-6" style={styles.btnContainer}>
                  <input type="button" value="Alterar" className="btn btn-primary" style={styles.btn}/>
              </div>
              <div className="col-6" style={styles.btnContainer}>
              <input type="button" value="Excluir" className="btn btn-primary" style={styles.btn}/>
            </div>
          </div>
          </form>
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
