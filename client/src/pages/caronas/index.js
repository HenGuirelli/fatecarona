import React, { Component } from 'react'
import LiftMgt from '../../components/LiftMgt'
import config from '../../config.json'
import axios from 'axios'
import { connect } from 'react-redux'
import { carregar } from '../../actions/liftActions'

class Caronas extends Component {

    constructor(props){
      super(props);
      this.state = {
        status: 'andamento',
        byID: [],
        loaded: false
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({
        status: event.target.value
      });
    }

    handleActivation = (carona) =>{
      this.props.dispatch(carregar(carona));
      this.props.history.push('/caronas/gerenciar')
    }

    buscaCaronas = () =>{
      let byID = this.state.byID
      switch(this.state.status) {
        case 'pendente':{
          return byID.filter(carona => carona.status === 'pendente')
        }
        case 'andamento':{
          return byID.filter(carona => carona.status === 'andamento')
        }
        case 'historico':{
          return byID.filter(carona => carona.status === 'historico')
        }
        default:{}
      }
    }


    loadCarona = () => {
      axios.get(config.endpoint + "/lift/motorista/" + this.props.userData.email)
      .then(resultEmail =>{
        axios.get(config.endpoint + "/caronista/" + this.props.userData.email)
        .then((resultCaronista)=>{
          this.caronasbyID(resultCaronista.data)
            .then(resultID =>{
                this.setState({
                  byID : resultEmail.data.concat(resultID),
                  loaded: true
                })
            })
        })

      })
    }



    caronasbyID = (listaCaronista) =>{
      var caronasID=[];
        return new Promise((resolve, reject)=>{
          listaCaronista.forEach((e, index) => {
            axios.get(config.endpoint + "/lift/id/" + e.id)
            .then(result => {
              caronasID.push(result.data[0])
              if (index === (listaCaronista.length -1)){
                resolve(caronasID)
              }
            })
            .catch((err) => reject(err.message))
          })
        })
    }


  render() {

    if (!this.state.loaded && typeof this.props.userData.email !== "undefined") this.loadCarona()

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
    var caronas = this.buscaCaronas();

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


            {
              caronas.length > 0 ?
              caronas.map((carona, key)=>
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
            :
            <div>Nenhuma Carona.</div>
          }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    userData: store.user.userData
  }
})(Caronas)
