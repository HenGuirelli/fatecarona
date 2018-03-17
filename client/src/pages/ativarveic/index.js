import React, { Component } from 'react'
import { connect } from 'react-redux'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'

class AtivarVeic extends Component{
  render(){
    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      }
    }

    return(
      <div className="pageBase">
        <div className="container">
          <form className="form-group">
              <center>
              <div>
                <CarIcon color="#000" style={{width: '2em', height: '2em'}}/>
              </div>
              </center>
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
})(AtivarVeic)
