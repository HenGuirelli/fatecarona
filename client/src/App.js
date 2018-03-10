import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import GoogleMap from './components/GoogleMaps'
import Auth from './pages/form'
import MainPage from './pages/main'
import Verify from './pages/verify'
import Perfil from './pages/perfil'
import Caronas from './pages/caronas'
import Config from './pages/config'
import { connect } from 'react-redux'
import { setFirebase, updateUser, unsetUser, insertUser, loadUser } from './actions/userActions'
import * as firebase from 'firebase'

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      "apiKey": "AIzaSyA9RLVdFNQblRw4NrVOViAGVvzGsd3EpxE",
      "authDomain": "fatecarona.firebaseapp.com",
      "databaseURL": "https://fatecarona.firebaseio.com",
      "projectId": "fatecarona",
      "storageBucket": "fatecarona.appspot.com",
      "messagingSenderId": "232610915822"
    })
    this.props.dispatch(setFirebase(firebase))
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(updateUser(user))
      } else {
        this.props.dispatch(unsetUser())
      }
    })
  }

  logOut() {
    firebase.auth().signOut()
  }

  test() {
    this.props.dispatch(
     insertUser({ra: 111111111, nome: 'thiago', email: 'thiago.ramos', genero: 'M', avatar: 'somePath/etc/'})
    );
  }

  testLoad() {
    this.props.dispatch(loadUser());
  }

  render() {
    const { history, user, pending } = this.props
    if (pending) return null

    //if localStorage gets more data then this should be trated differently
    if (!window.localStorage.key(0)) return <Auth history={history} alert={false}/>
    if (!user.emailVerified) return <Verify firebase={firebase} logOut={this.logOut.bind(this)}/>

    return (
      <div className="App">
        <NavBar logOut={this.logOut.bind(this)}/>
        <Route exact path="/" component={MainPage}/>
        <Route path="/rotas" component={GoogleMap}/>
        <Route path="/perfil" component={Perfil}/>
        <Route path="/caronas/historico" component={Caronas}/>
        <Route path="/config" render={() => <Config logOut={this.logOut.bind(this)}/>}/>
        <Route path="/test" render={() => 
          <div>
            <input 
            type="button" 
            onClick={this.test.bind(this)} value="Insert"/>
            <input 
            type="button" 
            onClick={this.testLoad.bind(this)} value="Select"/>
          </div>
        }/>
      </div>
    );
  }
}

export default withRouter(connect(store => {
  return {
    user: store.user.user,
    pending: store.user.pending,
  }
})(App))