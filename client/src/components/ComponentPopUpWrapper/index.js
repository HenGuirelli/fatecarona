import React from 'react'
import './style.css'

class ComponentPopUpWrapper extends React.Component {

    handleClick = (event, callBack) => {
        event.stopPropagation()
        if (callBack) callBack()
    }

    render(){
        const { children, open = false } = this.props
        const { onBackgroundClick, onContentClick } = this.props

        return (
            <section 
                className='poup-up-closable-background' 
                style={{ display: open ? 'block' : 'none' }} 
                onClick={(event) => this.handleClick(event, onBackgroundClick)}
            >
                <center>
                    <aside 
                        className='poup-up-closable'
                        onClick={(event) => this.handleClick(event, onContentClick)}
                    >
                        {children}
                    </aside>
                </center>
            </section>
        )
    }
}

export default ComponentPopUpWrapper