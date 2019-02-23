import React from 'react'
import Gerenciavel from '../index'
import Status from '../../../../components/Carona/Gerenciar/Status'
import Divider from '@material-ui/core/Divider'
import Preferencia from '../../../../components/Carona/Gerenciar/Preferencia'
import Veiculo from '../../../../components/Carona/Gerenciar/Veiculo'
import Rota from '../../../../components/Carona/Gerenciar/Rota'
import DentroDoCarro from '../../../../components/Carona/Gerenciar/DentroDoCarro'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { typeCarpool } from '../../../../enuns'

// apenas para teste, remover
import img from '../../../../images/musica.png'

/* TODO: CONTROLLER QUE RETORNA UM OBJETO COM TODOS ESSES DETALHES */
const detalhesTest = {
    status: 'Andamento',
    dia: '23/02/2019',
    hora: '18:00',
    tipo: 'indo para FATEC'
}

const prefCaronaTest = {
    fumante: false,
    deficiente: false,
    musica: false
}

const veiculoTest =  {
    marca: 'fiat',
    modelo: 'palio',
    placa: 'abc-1234'
}

const dentroDoCarroTest = [
    {
        nick: 'R',
        name: 'Robson',
        email: 'robsonGtna@emai.com',
        img: img,
        stars: 3,
        type: typeCarpool.DRIVER
    },
    {
        nick: 'W',
        name: 'wesley',
        email: 'wesley@emai.com',
        img: img,
        stars: 3,        
        type: typeCarpool.RIDER
    }
]

class Andamento extends Gerenciavel {
    render(){
        return (
             <main className='detalhes-carona-andamento'>
                <Status { ...detalhesTest } />
                <Divider />
                <Preferencia { ...prefCaronaTest } />
                <Divider />
                <Veiculo { ...veiculoTest } />
                <Divider />
                <Rota />
                <Divider />
                {
                    dentroDoCarroTest && dentroDoCarroTest.length > 0 ?
                    dentroDoCarroTest.map((item, index) => 
                        <DentroDoCarro 
                            key={`dentro-do-carro-${index}`} 
                            text={item.type === typeCarpool.DRIVER ? `${ item.nick || item.name }, motorista` : `${ item.nick || item.name }, passageiro`}
                            image={item.img}
                            stars={item.stars}
                        />)
                    :
                    null
                }
                
             </main>
        )
    }
}

export default Andamento