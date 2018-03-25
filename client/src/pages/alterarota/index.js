import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrajetoIcon  from '../../components/Rota/trajeto.png'
import Dialog from 'material-ui/Dialog'


class AlterarRota extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ativo: 0
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
              <img style={{width: '2.7em', height: '3em', margin:'0'}} src={TrajetoIcon} alt={"Trajeto Logo"}/>
            </div>

          </center>
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
  }
})(AlterarRota)
