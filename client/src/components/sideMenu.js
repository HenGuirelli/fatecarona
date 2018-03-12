import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import headerIcon from './headerIcon.svg'
import PlaceIcon from 'material-ui/svg-icons/maps/place'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import ConfIcon from 'material-ui/svg-icons/action/settings'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import ThumbIcon from 'material-ui/svg-icons/action/thumb-up'
import SpeakIcon from 'material-ui/svg-icons/action/record-voice-over'
import SmileIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { Link } from 'react-router-dom'

class Item extends React.Component {
  render() {
    const { path, text, icon, handleClose } = this.props
    return (
      <Link to={path} onClick={handleClose}>
        <MenuItem style={{color: '#333', fontWeight: 'bolder', fontSize: '20px'}} primaryText={text} leftIcon={icon} />
        <Divider style={{backgroundColor: '#333', height: '3px'}} />
      </Link>
    )
  }
}

class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  componentWillMount() {
    this.props.callback(this.handleOpen);
  }

  render() {
    const styles = {
      container: {
        backgroundColor: '#A8CF45',
      },
      nome: {
        color: '#333',
        fontWeight: 'bolder',
        fontSize: '15px',
      },
      header: {
        margin: '2em 1em',
      },
    }

    return (
      <Drawer
        docked={false}
        width={250}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        containerStyle={styles.container}
      >
        <center style={styles.header}>
          <img src={headerIcon} alt="" className="img-fluid mx-auto d-block"/>
        </center>
        <Divider style={{backgroundColor: '#333', height: '3px'}} />
        <Item path="/" text="Home" icon={<HomeIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/perfil" text="Editar perfil" icon={<ProfileIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/caronas/request" text="Quero carona" icon={<ThumbIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/caronas/offer" text="Oferecer carona" icon={<SpeakIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/rotas" text="Meu trajeto" icon={<PlaceIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/caronas/historico" text="Minhas caronas" icon={<SmileIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/veiculos" text="Meus veículos" icon={<CarIcon color={'#000'}/>} handleClose={this.handleClose}/>
        <Item path="/config" text="Configurações" icon={<ConfIcon color={'#000'}/>} handleClose={this.handleClose}/>
      </Drawer>
    );
  }
}

export default SideMenu