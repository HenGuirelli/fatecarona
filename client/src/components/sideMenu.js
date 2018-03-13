import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import headerIcon from '../pages/form/login_fatecarona.svg'
import PlaceIcon from 'material-ui/svg-icons/maps/place'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import ConfIcon from 'material-ui/svg-icons/action/settings'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import ThumbIcon from 'material-ui/svg-icons/action/thumb-up'
import SpeakIcon from 'material-ui/svg-icons/action/record-voice-over'
import SmileIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { Link } from 'react-router-dom'

export default class SideMenu extends React.Component {

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
        backgroundColor: '#6E4D8B',
      },
      header: {
        margin: '2em 1em',
      },
    }

    const items = [
      {
        path: '/', 
        text: 'Home', 
        icon: <HomeIcon color={'#FFF'}/>
      },
      {
        path: '/perfil', 
        text: 'Editar perfil', 
        icon: <ProfileIcon color={'#FFF'}/>
      },
      {
        path: '/caronas/request', 
        text: 'Quero carona', 
        icon: <ThumbIcon color={'#FFF'}/>
      },
      {
        path: '/caronas/offer', 
        text: 'Oferecer carona', 
        icon: <SpeakIcon color={'#FFF'}/>
      },
      {
        path: '/rotas', 
        text: 'Meus trajetos', 
        icon: <PlaceIcon color={'#FFF'}/>
      },
      {
        path: '/caronas/historico', 
        text: 'Minhas caronas', 
        icon: <SmileIcon color={'#FFF'}/>
      },
      {
        path: '/veiculos', 
        text: 'Meus veículos', 
        icon: <CarIcon color={'#FFF'}/>
      },
      {
        path: '/config', 
        text: 'Configurações', 
        icon: <ConfIcon color={'#FFF'}/>
      }
    ]

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
        <Divider style={{backgroundColor: '#FFF', height: '1px'}} />
        {items.map(item =>
          <Link to={item.path} onClick={this.handleClose} key={item.path}>
            <MenuItem 
              style={{color: '#FFF', fontWeight: 'bolder', fontSize: '20px', textDecoration: 'none'}} 
              primaryText={item.text} 
              leftIcon={item.icon}
            />
            <Divider style={{backgroundColor: '#FFF', height: '1px'}} />
          </Link>
        )}
      </Drawer>
    );
  }
}