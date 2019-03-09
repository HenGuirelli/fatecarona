import React from 'react'
import Icon from '../../../../images/veiculo_preto.png'
import Section from '../Section'
import './style.css'

const Veiculo = ({ marca, modelo, placa }) => (
    <Section title='veículo'>
        <div  className='gerenciar-carona-veiculo'>
            <div className='image-wrapper'>
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
        </div>
    </Section>
)

export default Veiculo