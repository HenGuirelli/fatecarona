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
import menuContent from './menuContent'
import { Link } from 'react-router-dom'

const withLink = item =>  (
	<Link to={item.route} key={item.text}>
		<ListItem button >
			<ListItemIcon> { item.icon } </ListItemIcon>
			<ListItemText primary={item.text} />
		</ListItem>
	</Link>
)

const withAction = item => (
	<ListItem button key={item.text} onClick={item.action}>
		<ListItemIcon> { item.icon } </ListItemIcon>
		<ListItemText primary={item.text} />
	</ListItem>
)

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
				{menuContent.map((item, index) => (	item.route ? withLink(item) : withAction(item) ))}
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
