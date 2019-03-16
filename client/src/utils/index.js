//import React from 'react'

const fillZeros = (length, value) => '0'.repeat(length - value.length) + value

const isNotNullOrEmpty = obj => obj !== undefined && obj !== null && obj !== '' && obj !== {} && obj !== []

export { fillZeros, isNotNullOrEmpty }