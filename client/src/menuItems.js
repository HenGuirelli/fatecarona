import PlaceIcon from 'material-ui/svg-icons/maps/place'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import ConfIcon from 'material-ui/svg-icons/action/settings'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import ThumbIcon from 'material-ui/svg-icons/action/thumb-up'
import SpeakIcon from 'material-ui/svg-icons/action/record-voice-over'
import SmileIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import NotificationIcon from 'material-ui/svg-icons/social/notifications'

export default [
  {
    path: '/',
    text: 'HOME',
    icon: HomeIcon,
    menu: true,
    selected: false
  },
  {
    path: '/perfil',
    text: 'EDITAR PERFIL',
    icon: ProfileIcon,
    menu: true,
    selected: false
  },
  {
    path: '/caronas/request',
    text: 'QUERO CARONA',
    icon: ThumbIcon,
    menu: true,
    selected: false
  },
  {
    path: '/caronas/offer',
    text: 'OFERECER CARONA',
    icon: SpeakIcon,
    menu: true,
    selected: false
  },
  {
    path: '/rotas',
    text: 'MEUS TRAJETOS',
    icon: PlaceIcon,
    menu: true,
    selected: false
  },
  {
    path: '/caronas/historico',
    text: 'MINHAS CARONAS',
    icon: SmileIcon,
    menu: true,
    selected: false
  },
  {
    path: '/veiculos',
    text: 'MEUS VEÍCULOS',
    icon: CarIcon,
    menu: true,
    selected: false
  },
  {
    path: '/notifications',
    text: 'NOTIFICAÇÕES',
    icon: NotificationIcon,
    menu: true,
    selected: false
  },
  {
    path: '/config',
    text: 'CONFIGURAÇÕES',
    icon: ConfIcon,
    menu: true,
    selected: false
  },
  {
    path: '/veiculos/ativar',
    text: 'ATIVAR VEÍCULO',
    menu: false
  },
  {
    path: '/veiculos/cadastrar',
    text: 'CADASTRAR VEÍCULO',
    menu: false
  },
  {
    path: '/rotas/alterar',
    text: 'ALTERAR ROTA',
    menu: false
  },
  {
    path: '/rotas/adicionar',
    text: 'ADICIONAR ROTA',
    menu: false
  }
]
