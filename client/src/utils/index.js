import React from 'react'
import { Redirect } from 'react-router-dom'

const fillZeros = (length, value) => '0'.repeat(length - value.length) + value

const isNotNullOrEmpty = obj => obj !== undefined && obj !== null && obj !== '' && obj !== {} && obj !== []

const redirect = to => <Redirect to={to} />

const formatDateToView = date => {
    try{
        const resp = date.toString().split('-')
        return `${resp[2]}/${resp[1]}/${resp[0]}`
    }catch(e){
        return '...'
    }
} 

const formatDateToSQL = date => {
    const resp = date.toString().split('/')
    return `${resp[2]}-${resp[1]}-${resp[0]}`
}

const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time))
}

const formatDestinationText = side => {
    try {
        return side === side.TO_FATEC ? 'indo para fatec' : 'saindo da fatec'
    }catch(e) {
        return '...'
    }
}

export { fillZeros, isNotNullOrEmpty, redirect, formatDateToView, formatDateToSQL, sleep, formatDestinationText }