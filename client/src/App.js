import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import './App.css'
import AdicionarRota from './pages/adicionarRota'
import Rotas from './pages/rotas'
import AlterarRota from './pages/alterarota'
import Auth from './pages/form'
import MainPage from './pages/main'
import Verify from './pages/verify'
import Perfil from './pages/perfil'
import EspiarPerfil from './pages/espiarperfil'
import Oferecer from './pages/oferecer'
import Pedir from './pages/pedir'
import Caronas from './pages/caronas'
import Notifications from './pages/notifications'
//import Caronas from './components/LiftPend'
import ResultCaronas from './pages/resultCaronas'
import Config from './pages/config'
import Veiculos from './pages/veiculos'
import CadVeiculo from './pages/cadveiculos'
import Recuperar from './pages/recuperar'
import Cadastro from './pages/cadastro'
import { connect } from 'react-redux'
import { setFirebase, updateUser, unsetUser,setUserData } from './actions/userActions'
import * as firebase from 'firebase'
import popUp, { TIPO } from './components/PopUp'
import 'typeface-roboto'

import Menu from './components/Menu'
import DevArea from './pages/devArea'


class App extends Component { 

  logOut() {
    popUp({ 
      tipo: TIPO.SIM_NAO, 
      text: 'Deseja realmente sair?',
      sim: () => { firebase.auth().signOut() }
    })
  }

  render() {
   
    return (
      <div className="App">
        <Menu />  
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/login" component={Auth}/>
          <Route exact path="/rotas" component={Rotas}/>
          <Route path="/rotas/alterar" component={AlterarRota}/>
          <Route path="/rotas/adicionar" component={AdicionarRota}/>
          <Route exact path="/perfil" component={Perfil}/>
          <Route path="/perfil/espiar" component={EspiarPerfil}/>
          <Route exact path="/caronas" component={Caronas}/>
          { /*<Route path="/caronas/historico" component={Caronas}/>*/}
          <Route path="/caronas/pedir" component={Pedir}/>
          {/* {<Route path="/caronas/matches" component={ResultCaronas}/>} */}
          <Route path="/caronas/oferecer" component={Oferecer}/>
          <Route exact path="/veiculos" component={Veiculos}/>
          <Route path="/veiculos/cadastrar" component={CadVeiculo}/>
          <Route path="/recuperarsenha" component={Recuperar}/>
          <Route path="/cadastro" component={Cadastro}/>
          <Route path="/notificacoes" component={Notifications}/>
          <Route path="/config" render={() => <Config logOut={this.logOut.bind(this)}/>}/>

          <Route path='/dev' component={DevArea} />

          <Route render={() => <div>four oh four</div>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData,
    needReload: store.user.needReload,
    pending: store.user.pending,
  }
})(App))
