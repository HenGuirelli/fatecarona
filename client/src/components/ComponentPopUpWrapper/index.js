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
                className={`poup-up-closable-background poup-up-closable-background-${ open ? 'open' : 'close'}`}
                onClick={(event) => this.handleClick(event, onBackgroundClick)}
            >
                <div className='poup-up-closable-content'>
                    <aside 
                        className='poup-up-closable'
                        onClick={(event) => this.handleClick(event, onContentClick)}
                    >
                        {children}
                    </aside>
                </div>
            </section>
        )
    }
}

export default ComponentPopUpWrapper