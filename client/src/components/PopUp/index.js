import sweetalert from 'sweetalert'

const TIPO = {
    ERRO: 'ERRO',
    AVISO: 'AVISO',
    SUCESSO: 'SUCESSO',
    DEFAULT: 'DEFAULT',
    SIM_NAO: 'SIM_NAO'
}

const PopUpFactory = (props, redirect) => {
    const { tipo, ...resto } = props
    switch (tipo) {
        case TIPO.ERRO:
            return withRedirect(erro(resto))(redirect)
        case TIPO.AVISO:
            return withRedirect(aviso(resto))(redirect)
        case TIPO.SUCESSO:
            return withRedirect(sucesso(resto))(redirect)
        case TIPO.SIM_NAO:
            return simNao(resto)
        default:
            return withRedirect(_default(resto))(redirect)
    }    
}

const aviso = props => () => sweetalert({  ...props, icon: 'warning' })
const erro = props => () => sweetalert({ ...props, icon: 'error' })
const sucesso = props => () => sweetalert({ ...props, icon: 'success' })
const _default = props => () => sweetalert({ ...props })
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

