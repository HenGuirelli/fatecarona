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
import { connect } from 'react-redux'
import { setText } from '../../actions/navigationActions'
import { Badge } from '@material-ui/core'

const pathNotToShow = [ '/login', '/cadastro' ]

class Menu extends React.Component {
	state = {
		open: false,
		inPathNotToShow: false
	}

	handleDrawerOpen = () => {
		this.setState({ open: true })
	}

	handleDrawerClose = () => {
		this.setState({ open: false })
	}

	withLink = item => {
		const getContent = () => (
			<Fragment>
				<ListItemIcon> { item.icon } </ListItemIcon>
				<ListItemText primary={item.text} />
			</Fragment>
		)
		return (
			<Link to={item.route} onClick={ ()=> 
				this.props.dispatch(setText(item.text))}>
				<ListItem button >
					{ item.badge ? <Badge badgeContent={this.props.numberOfNotification} color='error'> { getContent() } </Badge>: getContent() }
				</ListItem>
			</Link>
		)
	}
	
	withAction = item => {
		const getContent = () => (
			<Fragment>
				<ListItemIcon> { item.icon } </ListItemIcon>
				<ListItemText primary={item.text} />
			</Fragment>
		)
			
		return <ListItem button key={item.text} onClick={item.action}>
					{ item.badge ? <Badge badgeContent={this.props.numberOfNotification} color='error'> { getContent() } </Badge> : getContent() }
				</ListItem>
	}

	inPathNotToShow(){
		for (let path of pathNotToShow){
			if (window.location.href.includes(path))
				this.setState({ inPathNotToShow: true })
		}
		this.setState({ inPathNotToShow: false })
	}

	render() {
		const { open } = this.state
		const sideList = (
			<Fragment>		
				<Divider />
				<List>
					{menuContent.map((item, index) => {
						return item.route ? this.withLink(item) : this.withAction(item)
					})}
				</List>
			</Fragment>
		)

		if (this.props.isLogged){
			return (
				<div style={{ display: this.state.inPathNotToShow ? 'none' : 'flex' }}>
					<AppBar position='relative'>
						<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
						>
							<Badge badgeContent={this.props.numberOfNotification} color='error'>
								<MenuIcon />
							</Badge>
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							{ this.props.text }
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
		}else{
			 if (!window.location.href.includes('/login'))
			 	window.location.href = '/login'
			return null
		}
	}
}

export default connect(store => {
	return {
		isLogged: store.user.email !== undefined,
		text: store.navigation.text,
		numberOfNotification: store.notification.number
	}
})(Menu)
