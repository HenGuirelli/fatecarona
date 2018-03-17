import React, { Component } from 'react'

export default class Modal extends Component {
  displayModal(text) {
    document.getElementsByClassName('modal-body')[0].innerText = text;
    window.$('#errorModal').modal();
  }

  componentWillMount() {
    this.props.callBack(this.displayModal)
  }

  render() {
    const { title, logOut } = this.props
    return(
      <div className="modal fade" id="errorModal" tabIndex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="errorModalLabel">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={logOut}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}