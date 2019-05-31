import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Home from './images/Home.svg'
import Edit from './images/Edit.svg'
import Carona from './images/Carona.svg'
import Local from './images/Local.svg'
import Smile from './images/Smile.svg'
import Veiculo from './images/Veiculo.svg'
import Notificacoes from './images/Notificacoes.svg'
import Logout from './images/Logout.svg'

const itens = 
[
    {
        text: "Home",
        route: "/",
        icon:  <img src={Home} />
    },
    {
        text: "Editar Perfil",
        route: "/perfil",
        icon:  <img src={Edit} />
    },
    {
        text: "Quero Carona",
        route: "/caronas/pedir",
        icon:  <img src={Carona} />
    },
    {
        text: "Oferecer Carona",
        route: "/caronas/oferecer",
        icon:  <img src={Carona} />
    },
    {
        text: "Meus Trajetos",
        route: "/rotas",
        icon:  <img src={Local} />  
    },
    {
        text: "Minhas Caronas",
        route: "/caronas",
        icon:  <img src={Smile} />  
    },
    {
        text: "Meus Veiculos",
        route: "/veiculos",
        icon:  <img src={Veiculo} />  
    },
    {
        text: "Notificações",
        route: "/notificacoes",
        icon:  <img src={Notificacoes} />  
    },
    {
        text: "Logout",
        action: () => console.log('clicked'),
       // icon:  <img src={Logout} />  
    }
]

export default itens