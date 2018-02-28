import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import MapsDirections from 'material-ui/svg-icons/maps/directions';
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
      avatar: {
        border: '3px solid #333',
      },
      container: {
        backgroundColor: '#A8CF45',
      },
      nome: {
        color: '#333',
        fontWeight: 'bolder',
        fontSize: '15px',
      },
      header: {
        margin: '25px 0',
      }
    }

    const { userData } = this.props
    return (
      <Drawer
        docked={false}
        width={300}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        containerStyle={styles.container}
      >
        <center style={styles.header}>
          <Avatar
            src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
            size={150}
            style={styles.avatar}
          />
          <div style={styles.nome}>{userData.nome}</div>
        </center>
        <Divider style={{backgroundColor: '#333', height: '3px'}} />
        <Item path="/" text="Home" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/perfil" text="Editar perfil" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/caronas/request" text="Quero carona" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/caronas/offer" text="Oferecer carona" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/rotas" text="Meu trajeto" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/caronas/historico" text="Minhas caronas" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/veiculos" text="Meus veículos" icon={<MapsDirections />} handleClose={this.handleClose}/>
        <Item path="/config" text="Configurações" icon={<MapsDirections />} handleClose={this.handleClose}/>
      </Drawer>
    );
  }
}

export default SideMenu