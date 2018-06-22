import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import headerIcon from '../../pages/form/login_fatecarona.svg'
import styles from './styles'

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleOpen = () => this.setState({open: true});

  handleClose = () => {
    this.setState({open: false});
  };

  componentWillMount() {
    this.props.callback(this.handleOpen);
  }

  render() {
    const { menuItems, logOut, userData } = this.props

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
        {menuItems.map(item => {
            if (item.menu) {
              if (item.text === 'LOGOUT') {
                return <Link to='' onClick={logOut} key={item.path}>
                  <MenuItem
                    style={item.selected ? styles.itemSelected : styles.itemUnselected}
                    primaryText={item.text}
                    leftIcon={<item.icon color={item.selected ? '#000' : '#FFF'}/>}
                  />
                  <Divider style={{backgroundColor: '#FFF', height: '2px'}} />
                </Link>
              } else if (item.text === 'OFERECER CARONA' && userData.motorista !== 1) {
                return null
              }
              return <Link to={item.path} onClick={this.handleClose} key={item.path}>
                <MenuItem
                  style={item.selected ? styles.itemSelected : styles.itemUnselected}
                  primaryText={item.text}
                  leftIcon={<item.icon color={item.selected ? '#000' : '#FFF'}/>}
                />
                <Divider style={{backgroundColor: '#FFF', height: '2px'}} />
              </Link>
            }
            return null
          }
        )}
      </Drawer>
    );
  }
}
