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

const items = [
  {
    path: '/', 
    text: 'Home',
    icon: HomeIcon,
    selected: true
  },
  {
    path: '/perfil', 
    text: 'Editar perfil', 
    icon: ProfileIcon,
    selected: false
  },
  {
    path: '/caronas/request', 
    text: 'Quero carona', 
    icon: ThumbIcon,
    selected: false
  },
  {
    path: '/caronas/offer', 
    text: 'Oferecer carona', 
    icon: SpeakIcon,
    selected: false
  },
  {
    path: '/rotas', 
    text: 'Meus trajetos', 
    icon: PlaceIcon,
    selected: false
  },
  {
    path: '/caronas/historico', 
    text: 'Minhas caronas', 
    icon: SmileIcon,
    selected: false
  },
  {
    path: '/veiculos', 
    text: 'Meus veículos', 
    icon: CarIcon,
    selected: false
  },
  {
    path: '/config', 
    text: 'Configurações', 
    icon: ConfIcon,
    selected: false
  }
]

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleOpen = () => this.setState({open: true});

  handleClose = item => {
    items.forEach(element => element.selected = false)
    item.selected = true;
    this.setState({open: false});
  };

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
      itemUnselected: {
        color: '#FFF', 
        fontWeight: 'bolder', 
        fontSize: '20px', 
        textDecoration: 'none',
        backgroundColor: '#6E4D8B'
      },
      itemSelected: {
        color: '#000', 
        fontWeight: 'bolder', 
        fontSize: '20px', 
        textDecoration: 'none',
        backgroundColor: '#A8CF45'
      }
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
        <Divider style={{backgroundColor: '#FFF', height: '1px'}} />
        {items.map(item =>
          <Link to={item.path} onClick={() => this.handleClose(item)} key={item.path}>
            <MenuItem 
              style={item.selected ? styles.itemSelected : styles.itemUnselected} 
              primaryText={item.text}
              leftIcon={<item.icon color={item.selected ? '#000' : '#FFF'}/>}
            />
            <Divider style={{backgroundColor: '#FFF', height: '2px'}} />
          </Link>
        )}
      </Drawer>
    );
  }
}