import React, { Fragment } from 'react'
import Button from '../../../components/Form/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { Paper, Typography } from '@material-ui/core'
import './style.css'
import MobileStepper from '@material-ui/core/MobileStepper'

const MyMobileStepper = props => {
    const { steps } = props
    return(
        <Fragment>
            <Paper square elevation={0} className='profile-mobile-header'>
                <Typography component='h3' variant='subtitle1' align='center'>
                    { props.label }
                </Typography>
            </Paper>
            { props.children }
            <div className='mobile-stepper-wrapper'>
                <MobileStepper
                    steps={steps.length}
                    position="static"
                    activeStep={props.activeStep}
                    nextButton={
                        <Button size="small" onClick={props.handleNext} disabled={props.nextButtonDisabled}>
                            Próximo
                            <KeyboardArrowRight />
                        </Button>
                        }
                    backButton={
                        <Button size="small" onClick={props.handlePrevious} disabled={props.previousButtonDisabled}>
                            <KeyboardArrowLeft />
                            Anterior
                        </Button>
                        }
                />
            </div>
        </Fragment>
    )
}

export default MyMobileStepper