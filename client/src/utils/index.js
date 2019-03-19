import React from 'react'
import { Redirect } from 'react-router-dom'

const fillZeros = (length, value) => '0'.repeat(length - value.length) + value

const isNotNullOrEmpty = obj => obj !== undefined && obj !== null && obj !== '' && obj !== {} && obj !== []

const redirect = to => <Redirect to={to} />

const formatDateToView = date => {
    const resp = date.toString().split('-')
    return `${resp[2]}-${resp[1]}-${resp[0]}`
} 

const formatDateToSQL = date => {
    const resp = date.toString().split('/')
    return `${resp[2]}-${resp[1]}-${resp[0]}`
}

const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time))
}



export { fillZeros, isNotNullOrEmpty, redirect, formatDateToView, formatDateToSQL, sleep }