import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import { withRouter } from 'react-router-dom'

class GlobalDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: null,
      open: false,
      title: null,
      msg: '',
      onRequestClose: this.closeDialog
    }
  }

  displayDialog = (dialog, path) => {
    dialog.open = true
    this.setState(dialog)
    this.path = path
  }

  closeDialog = () => {
    this.setState({open: false})
    if (this.path) this.props.history.push(this.path)
  }

  componentDidMount() {
    window.displayDialog = this.displayDialog
    window.closeDialog = this.closeDialog
  }

  render() {
    const { msg, ...myState } = this.state

    return(
      <Dialog
        modal={false}
        ref="globalDialog"
        {...myState}
      >
      {msg}
      </Dialog>
    )
  }
}

export default withRouter(GlobalDialog)
