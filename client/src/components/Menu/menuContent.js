import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

const itens = 
[
    {
        text: "Home",
        route: "/",
        icon:  <MailIcon />
    },
    {
        text: "Editar Perfil",
        route: "/perfil",
        icon:  <InboxIcon />
    },
    {
        text: "Quero Carona",
        route: "/"
    },
    {
        text: "Oferecer Carona",
        route: "/caronas/oferecer"
    },
    {
        text: "Meus Trajetos",
        route: "/"
    },
    {
        text: "Minhas Caronas",
        route: "/"
    },
    {
        text: "Meus Veiculos",
        route: "/veiculos"
    },
    {
        text: "Notificações",
        route: "/"
    },
    {
        text: "Logout",
        action: () => console.log('clicked')
    }
]

export default itens