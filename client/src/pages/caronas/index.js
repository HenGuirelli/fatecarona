import React, { Component } from 'react'
import AvatarHeader from '../../components/AvatarHeader'
import Lift from '../../components/Lift'
import { connect } from 'react-redux'

class Caronas extends Component {
  render() {
    const { userData } = this.props

    return (
      <div>
        <AvatarHeader userData={userData}/>
        <div className="container">
          <div className="row">
            <Lift 
              userData={userData} 
              action="Deu Carona" 
              date="29/07/2017" 
              desc="Chegando na Fatec."
              rating={2}
            />
            <Lift 
              userData={userData} 
              action="Recebeu Carona" 
              date="01/02/2018" 
              desc="Saindo da Fatec."
              rating={4}
            />
            <Lift 
              userData={userData} 
              action="Deu Carona" 
              date="03/03/2018" 
              desc="Chegando na Fatec."
              rating={3}
            />
          </div>
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
})(Caronas)