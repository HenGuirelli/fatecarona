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
            alt: props.alt
        }
    }

    render(){
        const { inFatec, outFatec, nick } = this.props
        const fistLetter = nick !== '' ? getFirstLetter(nick) : '' 

        return (
            <section className='home-header'>
                <div className='item'>                
                    <Typography component='div' variant='subtitle1'>
                        Chegando <br/> na <br/> Fatec 
                    </Typography>              
                    <Typography component='div' variant='h5'>
                        { inFatec }
                    </Typography>
                </div>
                <div className='item'>
                    <Typography component='div' variant='h5' align='center'>
                        { nick }
                        <Avatar alt={this.state.alt} src={this.state.src} className='centralize avatar'> {fistLetter} </Avatar>
                    </Typography>
                </div>
                <div className='item'>
                    <Typography component='div' variant='subtitle1' align='right'>
                        Saindo <br/> da <br/> fatec
                    </Typography>
                    <Typography component='div' variant='h5' align='right'>
                        { outFatec }
                    </Typography>
                </div>
            </section>
        )
    }
}

export default Header