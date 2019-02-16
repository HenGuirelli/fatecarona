import React, { Fragment } from 'react'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import DadosPessoais from '../../../components/perfil/DadosPessoais'
import PerfilMotorista from '../../../components/perfil/motorista'
import Button from '../../../components/Form/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { Paper, Typography } from '@material-ui/core'
import './style.css'

const steps = ['Dados Pessoais', 'Motorista', 'Carros', 'Trajetos']

const getStepContent = index => {
    switch (index){
        case 0:
            return <DadosPessoais />
        case 1:
            return <PerfilMotorista />
        case 4:
            return <FinalPage />
        default:
            return <h1>Em Construção...</h1>
    }
}

const FinalPage = props => (
    <h1>Perfil Atualizado!</h1>
)

const DesktopStepper = props => (
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
)

const MyMobileStepper = props => (
    <Fragment>
        <Paper square elevation={0} className='profile-mobile-header'>
            <Typography component='h3' variant='subtitle1' align='center'>
                { props.label }
            </Typography>
        </Paper>
        { props.children }
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
    </Fragment>
)

const mobileStepperWidth = 500

class FirstTime extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            width: 0, 
            height: 0,
            activeStep: 0,
            nextButtonDisabled: false,
            previousButtonDisabled: true
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    
    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }
  
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }
  
    updateWindowDimensions() {        
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    handleNext = event => {
        this.setState({
            activeStep: this.state.activeStep + 1,
            nextButtonDisabled: this.state.activeStep === steps.length - 1,
            previousButtonDisabled: false
        })
    }

    handlePrevious = event => {
        this.setState({
            activeStep: this.state.activeStep - 1,
            nextButtonDisabled: this.state.activeStep === steps.length - 1,
            previousButtonDisabled: this.state.activeStep === 1
        })
    }

    render(){
        const { activeStep } = this.state
        
        const isMobile = this.state.width <= mobileStepperWidth

        if (isMobile){
            return (
                <MyMobileStepper 
                    activeStep={activeStep} 
                    handlePrevious={this.handlePrevious}
                    handleNext={this.handleNext}
                    nextButtonDisabled={this.state.nextButtonDisabled}
                    previousButtonDisabled={this.state.previousButtonDisabled}
                    label={steps[activeStep]}
                > 
                    { getStepContent(activeStep) } 
                </MyMobileStepper> 
            )
        }else {
            return (
                <DesktopStepper 
                    activeStep={activeStep}
                    handlePrevious={this.handlePrevious}
                    handleNext={this.handleNext}
                    nextButtonDisabled={this.state.nextButtonDisabled}
                    previousButtonDisabled={this.state.previousButtonDisabled}
                >
                    { getStepContent(activeStep) }
                </DesktopStepper> 
            )
        }
    }
}

export default FirstTime