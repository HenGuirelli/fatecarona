import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './style.css'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const getFirstLetter  = (value) => value ? value[0] || '' : ''

class Header extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            src: props.src,
            children: props.children,
            firstLetter: getFirstLetter(props.children),
            alt: props.alt
        }
    }

    render(){
        const { firstLetter, children } = this.state

        return (
            <section className='home-header'>
                <div className='item'>                
                    <Typography component='div' variant='subtitle1'>
                        Chegando <br/> na <br/> Fatec 
                    </Typography>              
                    <Typography component='div' variant='h5'>
                        undefined
                    </Typography>
                </div>
                <div className='item'>
                    <Typography component='div' variant='h5' align='center'>
                        { children }
                        <Avatar alt={this.state.alt} src={this.state.src} className='centralize avatar'> {firstLetter} </Avatar>
                    </Typography>
                </div>
                <div className='item'>
                    <Typography component='div' variant='subtitle1' align='right'>
                        Saindo <br/> da <br/> fatec
                    </Typography>
                    <Typography component='div' variant='h5' align='right'>
                        undefined
                    </Typography>
                </div>
            </section>
        )
    }
}

export default Header