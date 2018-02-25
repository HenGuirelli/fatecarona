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
        <MenuItem primaryText={text} leftIcon={icon} />
        <Divider />
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
        border: '3px solid grey',
        margin: '20px 0 20px 67px'
      }
    }

    const { userData } = this.props
    return (
      <div>
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Avatar
            src={userData.img ? "http://localhost:8080/images/" + userData.img : ""}
            size={150}
            style={styles.avatar}
          />
          <Divider />
          <Item path="/perfil" text="Editar perfil" icon={<MapsDirections />} handleClose={this.handleClose}/>
          <Item path="/caronas/request" text="Quero carona" icon={<MapsDirections />} handleClose={this.handleClose}/>
          <Item path="/caronas/offer" text="Oferecer carona" icon={<MapsDirections />} handleClose={this.handleClose}/>
          <Item path="/rotas" text="Meu trajeto" icon={<MapsDirections />} handleClose={this.handleClose}/>
          <Item path="/caronas/historico" text="Minhas caronas" icon={<MapsDirections />} handleClose={this.handleClose}/>
          <Item path="/veiculos" text="Meus veículos" icon={<MapsDirections />} handleClose={this.handleClose}/>
          <Item path="/config" text="Configurações" icon={<MapsDirections />} handleClose={this.handleClose}/>
        </Drawer>
      </div>
    );
  }
}

export default SideMenu