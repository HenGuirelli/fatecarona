import React, { Component } from 'react'
import LiftRating from '../../components/LiftRating'
import LiftMgt from '../../components/LiftMgt'
import { connect } from 'react-redux'
import { loadCaronista, loadLiftbyID, loadLiftbyEmail, carregar } from '../../actions/liftActions'

const styles = {
  btn: {
    margin: '25px 0',
    borderRadius: '8px',
    backgroundColor: '#6E4D8B',
    borderColor: '#ffffff',
    color: '#ffffff',
    fontSize: '12px',
    width: '80%',
    marginLeft: '8%'
  },
  btn2: {
    margin: '25px 0',
    borderRadius: '8px',
    backgroundColor: '#6E4D8B',
    borderColor: '#ffffff',
    color: '#ffffff',
    fontSize: '12px',
    width: '80%',
  },
  radiobtn: {
    display:'none',
}
}

class Caronas extends Component {

    constructor(props){
      super(props);
      this.state = {
        status: 'andamento'
      };
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
      this.props.dispatch(loadLiftbyEmail(this.props.userData.email))
      this.props.dispatch(loadCaronista(this.props.userData.email))
    }

    handleChange(event) {
      this.setState({
        status: event.target.value
      });
      this.buscaCarona();
    }

    handleActivation = (carona) =>{
      this.props.dispatch(carregar(carona));
      this.props.history.push('/caronas/gerenciar')
    }

    buscaCarona = (status) =>{
      if (this.props.caronasbyEmail.length === 0 && this.props.caronasbyID.length === 0){
        return(
          <div>Nenhuma carona.</div>
        )
      }

      let contEmail = false;
      let byEmail = this.props.caronasbyEmail.map((carona, key) =>
        { if(carona.status === status){
            contEmail = true;
            return(
              <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                  <LiftMgt
                    infomotorista={carona.emailMotorista}
                    caronista = {0}
                    data={carona.dataCarona}
                    tipo={carona.tipo}
                  />
                <div className="row" style={{bottom: 0, width: '100%'}}>
                  <div className="col-6" style={styles.btnContainer}>
                    <input type="button" style={styles.btn} onClick={() => this.handleActivation(carona)} className="btn btn-primary" value="GERENCIAR" />
                  </div>
                  <div className="col-6" style={styles.btnContainer}>
                    <input type="button" style={styles.btn2} onClick ={this.handleSubmit} className="btn btn-primary" value="ESPIAR MOTORISTA" />
                  </div>
                </div>
              </div>
            )
          }else {
            return(null)
          }
        }
      );

      let contID = false;
      let byID = this.props.caronasbyID.map((carona, key) =>
        { if(carona.status === status){
          contID = true;
          return(
            <div className="row" key={key} style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <LiftMgt
                  infomotorista={carona.emailMotorista}
                  caronista = {1}
                  data={carona.dataCarona}
                  tipo={carona.tipo}
                />
              <div className="row" style={{bottom: 0, width: '100%'}}>
                <div className="col-6" style={styles.btnContainer}>
                  <input type="button" style={styles.btn} onClick={() => this.handleActivation(carona)} className="btn btn-primary" value="GERENCIAR" />
                </div>
                <div className="col-6" style={styles.btnContainer}>
                  <input type="button" style={styles.btn2} onClick ={this.handleSubmit} className="btn btn-primary" value="ESPIAR MOTORISTA" />
                </div>
              </div>
            </div>
          )
        }else {
            return(null)
          }
        }
        );

        if (!contEmail && !contID){
          return(
            <div>Nenhuma carona.</div>
          )
        }else
          return(
            <div>
              {byEmail}
              {byID}
            </div>
          )

    }



  render() {
    console.log(this.props.caronistaFull);
    console.log(this.props.listaCaronista.length);

    if (! this.props.caronistaFull && this.props.listaCaronista.length > 0) {
      this.props.listaCaronista.map((caronista) =>
        this.props.dispatch(loadLiftbyID(caronista.id))
      )
    }



    window.comp = LiftRating

    return (
      <div>

        <div  className="row btn-group btn-group-toggle" style={{width:'100%'}} >
          <label className="btn btnLift col-4" htmlFor="option1"
            href="#radioCollapse">
            <input
              type="radio"
              style={styles.radiobtn}
              name="options" id="option1"
              value="andamento"
              checked={this.state.status === "andamento"}
              onChange={this.handleChange}
            />
            EM ANDAMENTO
          </label>
          <label className="btn btnLift col-4" htmlFor="option2"
            href="#radioCollapse">
            <input
              type="radio"
              style={styles.radiobtn}
              name="options" id="option2"
              value="historico"
              checked={this.state.status === "historico"}
              onChange={this.handleChange}
            />
            HISTÓRICO
          </label>
          <label className="btn btnLift col-4" htmlFor="option3"
            href="#radioCollapse">
            <input
              type="radio"
              style={styles.radiobtn}
              name="options" id="option3"
              value="pendente"
              checked={this.state.status === "pendente"}
              onChange={this.handleChange}
            />
            PENDENTE
          </label>
        </div>

        <div className="container">
          <div className="row" id="radioCollapse" >

              {this.buscaCarona(this.state.status)}


          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    caronasbyID: store.lift.caronasbyID,
    caronasbyEmail: store.lift.caronasbyEmail,
    listaCaronista: store.lift.listaCaronista,
    caronistaFull: store.lift.caronistaFull,
    user: store.user.user,
    userData: store.user.userData
  }
})(Caronas)
