import sweetalert from 'sweetalert'

const TIPO = {
    ERRO: 'ERRO',
    AVISO: 'AVISO',
    SUCESSO: 'SUCESSO',
    SIM_NAO: 'SIM_NAO',
    DEFAULT: 'DEFAULT'
}

const PopUpFactory = (props, redirect) => {
    const { tipo, ...resto } = props
    switch (tipo) {
        case TIPO.ERRO:
            return (erro(resto))
        case TIPO.AVISO:
            return (aviso(resto))
        case TIPO.SUCESSO:
            return (sucesso(resto))
        case TIPO.SIM_NAO:
            return simNao(resto)
        default:
            return (_default(resto))
    }    
}

const aviso = props => sweetalert({  ...props, icon: 'warning' })
const erro = props => sweetalert({ ...props, icon: 'error' })
const sucesso = props => sweetalert({ ...props, icon: 'success' })
const _default = props => sweetalert({ ...props })
const simNao = props => {
    const { sim, nao } = props
    return  sweetalert({ ...props , dangerMode: true, buttons: ['Não', 'Sim']})
            .then((result) => {
                if(result){
                    sim()
                }else if (nao){
                    nao()
                }
            })
}

const withRedirect = popup => {
    return (path) => {
        popup().then(value => {
            if (path){ window.location = path }
        })
    }
}


export default PopUpFactory
export { TIPO }

