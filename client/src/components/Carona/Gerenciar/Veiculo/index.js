import React from 'react'
import Icon from '../../../../images/veiculo_preto.png'
import Section from '../Section'
import './style.css'

const Veiculo = ({ brand, model, plate }) => (
    <Section title='veículo'>
        <div  className='gerenciar-carona-veiculo'>
            <div className='image-wrapper'>
                <img src={Icon} />
            </div>
            <div>
                <p>
                    {brand}, {model}
                </p>
                <span>
                    {plate}
                </span>
            </div>
        </div>
    </Section>
)

export default Veiculo