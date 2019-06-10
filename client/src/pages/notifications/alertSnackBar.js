import React from 'react'
import { connect } from 'react-redux'
import Notification from '../../notificacao'
import Snackbar from '@material-ui/core/Snackbar'
import { setNumberOfNewNotifications } from '../../actions/notificationActions'

class AlertSnackBar extends React.Component {
    state = {
        open: false,
        text: ''
    }

    constructor(props){
        super(props)

        this.oldLength = 0
    }

    componentDidMount() {
        console.log('----- thread de notificações inciada ----', this.props.email)
        Notification.getInstance().run(this.props.email, this.notificationRecivied)
    }

    notificationRecivied = (notifications) => {
        Notification.getInstance().email = this.props.email

        if (notifications.length === this.oldLength){
            return
        }else{
            let countNotification = 0
            notifications.forEach(notification => {
                if (!notification.visualized){
                    countNotification++
                    this.setState({ open: true, text: notification.text })
                }
            })

            this.props.dispatch(setNumberOfNewNotifications(countNotification))
            this.oldLength = notifications.length
        }
    }

    onClose = () => {
        this.setState({ open: false, text: '' })
    }

    render(){
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={ this.onClose }
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{ this.state.text }</span>}                
            />
        )
    }
}

export default connect(store => {
    return {
        email: store.user.email 
    } 
})(AlertSnackBar)