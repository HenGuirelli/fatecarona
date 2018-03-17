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
    text: 'Home',
    icon: HomeIcon,
    selected: true
  },
  {
    path: '/perfil',
    text: 'Editar perfil',
    icon: ProfileIcon,
    selected: false
  },
  {
    path: '/caronas/request',
    text: 'Quero carona',
    icon: ThumbIcon,
    selected: false
  },
  {
    path: '/caronas/offer',
    text: 'Oferecer carona',
    icon: SpeakIcon,
    selected: false
  },
  {
    path: '/rotas',
    text: 'Meus trajetos',
    icon: PlaceIcon,
    selected: false
  },
  {
    path: '/caronas/historico',
    text: 'Minhas caronas',
    icon: SmileIcon,
    selected: false
  },
  {
    path: '/veiculos',
    text: 'Meus veículos',
    icon: CarIcon,
    selected: false
  },
  {
    path: '/config',
    text: 'Configurações',
    icon: ConfIcon,
    selected: false
  }
]
