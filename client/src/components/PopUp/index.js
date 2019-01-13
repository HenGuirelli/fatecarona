import sweetalert from 'sweetalert'

const TIPO = {
    ERRO: 'ERRO',
    AVISO: 'AVISO',
    SUCESSO: 'SUCESSO',
    DEFAULT: 'DEFAULT'
}

const popUpFactory = props => {
    const { tipo, ...resto } = props
    switch (tipo) {
        case TIPO.ERRO:
            return erro(resto)
        case TIPO.AVISO:
            return aviso(resto)
        case TIPO.SUCESSO:
            return sucesso(resto)
        default:
            return _default(resto)
    }    
}

const aviso = props => () => sweetalert({  ...props, icon: 'warning' })
const erro = props => () => sweetalert({ ...props, icon: 'error' })
const sucesso = props => () => sweetalert({ ...props, icon: 'success' })
const _default = props => () => sweetalert({ ...props })

export { popUpFactory, TIPO }

