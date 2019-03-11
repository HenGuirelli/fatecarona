import React, { Fragment } from 'react'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '../../../components/Form/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { Paper, Typography } from '@material-ui/core'
import './style.css'
import FirstTimeEdittingProfileHttp from '../../../http/FirstTimeEdittingProfile'
import { connect }from 'react-redux'

// steppers
import MyMobileStepper from './MobileStepper'
import DesktopStepper from './DesktopStepper'

// pages
import DadosPessoais from './DadosPessoais'
import DriverProfile from './DriverProfile'
import AdicionarRota from '../../adicionarRota'

import { setUserData, setDriverProfile } from '../../../actions/userActions'
import { setCar } from '../../../actions/carActions';
import { setFlow } from '../../../actions/flowActions';

const steps = ['Dados Pessoais', 'Motorista', 'Trajetos']

// Tracks
class Track {
    constructor(){
        this.data = {}
    }

    trackState = val => this.data = val

    getState = () => this.data
}

const personalData = new Track()
const driverData = new Track()
const carData = new Track()
const flowData = new Track()

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
    
    getStepContent = index => {
        switch (index){
            case 0:
                return <DadosPessoais trackState={personalData.trackState} />
            case 1:
                return <DriverProfile withButton={false} driverTrack={driverData.trackState} carTrack={carData.trackState} />
            case 2:
                return  <div className='step-cad-cars'> <AdicionarRota withButton={false} trackState={flowData.trackState} /></div>
            case 3:
                return <h1>Perfil Atualizado!</h1>
            default:
                return <h1>Em Construção...</h1>
        }
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

    savePersonalData = () => {
        const data = personalData.getState()
        const local = () => {
            this.props.dispatch(setUserData({ ...data }))
        }

        const persist = () => {
            FirstTimeEdittingProfileHttp.personalData({ ...data, email: this.props.email })
            .then(resolve => {
                const result = resolve.data

                if (!result.success){
                    // TODO: mensagem de erro
                }
            })
        }

        local()
        persist()
    }

    saveDriverData = () => {
        const _driverData = driverData.getState()
        const local = () => {
            this.props.dispatch(setDriverProfile({ ..._driverData }))
        }

        const persist = () => {
            FirstTimeEdittingProfileHttp.driverData({ ..._driverData, email: this.props.email })
            .then(resolve => {
                const result = resolve.data

                if (!result.success){
                    // TODO: mensagem de erro
                }
            })
        }

        local()
        persist()
    }

    saveCarData = () => {
        const _carData = carData.getState()
        const local = () => {
            this.props.dispatch(setCar({ ..._carData }))
        }

        const persist = () => {
            FirstTimeEdittingProfileHttp.carData({ ..._carData, email: this.props.email })
            .then(resolve => {
                const result = resolve.data

                if (!result.success){
                    // TODO: mensagem de erro
                }
            })
        }

        local()
        persist()
    }

    saveFlowData = () => {
        const _flowData = flowData.getState()
        const local = () => {
            this.props.dispatch(setFlow({ ..._flowData }))
        }

        const persist = () => {
            FirstTimeEdittingProfileHttp.flowData({ ..._flowData, email: this.props.email })
            .then(resolve => {
                const result = resolve.data

                if (!result.success){
                    // TODO: mensagem de erro
                }
            })
        }

        local()
        persist()
    }

    componentWillUnmount(){
        // TODO: clear redux
    }

    handleNext = event => {
        const activeStep = this.state.activeStep + 1

        switch (activeStep){
            case 1: {
                this.savePersonalData()
                break;
            }
            case 2: {
                this.saveDriverData()
                this.saveCarData()
                break;
            }
            case 3: {
                this.saveFlowData()
                break
            }

        }
        this.setState({
            activeStep,
            nextButtonDisabled: this.state.activeStep === steps.length - 1,
            previousButtonDisabled: false
        })
    }

    handlePrevious = event => {
        this.setState({
            activeStep: this.state.activeStep - 1,
            nextButtonDisabled: this.state.activeStep - 2 === steps.length - 1,
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
                    steps={steps}
                > 
                    { this.getStepContent(activeStep) } 
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
                    steps={steps}
                >
                    { this.getStepContent(activeStep) }
                </DesktopStepper> 
            )
        }
    }
}

export default connect(store => {
    return {
        email: store.user.email
    }
})(FirstTime)