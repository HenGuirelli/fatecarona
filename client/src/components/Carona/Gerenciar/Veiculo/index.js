import React from 'react'
import Icon from '../../../../images/veiculo_preto.png'
import './style.css'

const Veiculo = ({ marca, modelo, placa }) => (
    <section className='gerenciar-carona-veiculo'>
        <div class='image-wrapper'>
            <img src={Icon} />
        </div>
        <div>
            <p>
                {marca}, {modelo}
            </p>
            <span>
                {placa}
            </span>
        </div>
    </section>
)

export default Veiculo