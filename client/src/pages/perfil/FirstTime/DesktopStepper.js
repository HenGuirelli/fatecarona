import React from 'react'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '../../../components/Form/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { Paper, Typography } from '@material-ui/core'
import './style.css'


const DesktopStepper = props => {
    const { steps } = props
    return (
        <Paper className='profile-desktop-paper'>
            <div className='desktop-stepper'>
                <Stepper activeStep={props.activeStep} className='stepper-first-time'>
                    {steps.map(label => (
                        <Step key={label} className='step-item'>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                { props.children }
                <br />
                <div className='buttons-desktop'>
                    <Button onClick={props.handlePrevious} disabled={props.previousButtonDisabled}> 
                        <KeyboardArrowLeft />
                        Anterior 
                    </Button>
                    <Button onClick={props.handleNext} disabled={props.nextButtonDisabled}> 
                        Próximo 
                        <KeyboardArrowRight />
                    </Button>
                </div>
            </div>
        </Paper>
    )
}

export default DesktopStepper