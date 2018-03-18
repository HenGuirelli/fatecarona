import PlaceIcon from 'material-ui/svg-icons/maps/place'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import ConfIcon from 'material-ui/svg-icons/action/settings'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import ThumbIcon from 'material-ui/svg-icons/action/thumb-up'
import SpeakIcon from 'material-ui/svg-icons/action/record-voice-over'
import SmileIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'

export default [
  {
    path: '/',
    text: 'HOME',
    icon: HomeIcon,
    selected: false
  },
  {
    path: '/perfil',
    text: 'EDITAR PERFIL',
    icon: ProfileIcon,
    selected: false
  },
  {
    path: '/caronas/request',
    text: 'QUERO CARONA',
    icon: ThumbIcon,
    selected: false
  },
  {
    path: '/caronas/offer',
    text: 'OFERECER CARONA',
    icon: SpeakIcon,
    selected: false
  },
  {
    path: '/rotas',
    text: 'MEUS TRAJETOS',
    icon: PlaceIcon,
    selected: false
  },
  {
    path: '/caronas/historico',
    text: 'MINHAS CARONAS',
    icon: SmileIcon,
    selected: false
  },
  {
    path: '/veiculos',
    text: 'MEUS VEÍCULOS',
    icon: CarIcon,
    selected: false
  },
  {
    path: '/config',
    text: 'CONFIGURAÇÕES',
    icon: ConfIcon,
    selected: false
  }
]
