import React, { Fragment } from 'react'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import menuContent from './menuContent.json'
import { Link } from 'react-router-dom'

const icons = {
  'Home': <MailIcon />,
  'Editar Perfil': <InboxIcon />
}

class Menu extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
	const sideList = (
	<Fragment>		
		<Divider />
		<List>
			{menuContent.itens.map((item, index) => (
			<Link to={item.route}>
				<ListItem button key={item.text}>
				<ListItemIcon> { icons[item.text] } </ListItemIcon>
				<ListItemText primary={item.text} />
				</ListItem>
			</Link>
			))}
		</List>
	</Fragment>
	)

    return (
      <div>
        <AppBar position='relative'>
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Path Atual
            </Typography>
          </Toolbar>
        </AppBar>

		<Drawer open={open} onClose={this.handleDrawerClose}>
			<div
				tabIndex={0}
				role="button"
				onClick={this.handleDrawerClose}
				onKeyDown={this.handleDrawerClose}
			>
			{sideList}
			</div>
		</Drawer>
      </div>
    )
  }
}

export default Menu
