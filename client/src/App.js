import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import GoogleMap from './components/GoogleMaps'
import Auth from './pages/form'
import MainPage from './pages/main'
import { connect } from 'react-redux'
import { setFirebase, updateUser, unsetUser } from './actions/userActions'
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

  render() {
    const { isLogged, history } = this.props
    //if (!isLogged) return <Auth history={history}/>

    if (!window.localStorage.key(0).match('firebase')) return <Auth history={history}/>

    return (
      <div className="App">
        <NavBar logOut={this.logOut.bind(this)}/>
        <Route exact path="/" component={MainPage}/>
        <Route path="/rotas" component={GoogleMap}/>
      </div>
    );
  }
}

export default withRouter(connect(store => {
  return {
    isLogged: store.user.isLogged,
  }
})(App))