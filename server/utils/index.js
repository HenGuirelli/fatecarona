const { Weekday } = require('../enum/carona')

const formatDate = date => {
    const resp = date.split('/')
    return `${resp[2]}-${resp[1]}-${resp[0]}`
}

const stringToBool = value => value.toString().toUpperCase() === 'TRUE' 

const formatDateResolve = date => {
    if (date.indexOf('-') !== -1){ // correct format
        return date
    }else{
        return formatDate(date)
    }
}


/**
 * @param {number} val1 Primeiro horario no formato "hh:mm"
 * @param {number} val2 Segundo horario no formato "hh:mm"
 * @param {boolean} negative false para apenas valores absolutos
 * @returns {number}
 */
const minutesDiff = (val1, val2, negative = true) => {
    const hour1 = val1.split(':')
    const hour2 = val2.split(':')
    const diffHour = parseInt(hour2[0]) - parseInt(hour1[0])
    const diffMinutes = parseInt(hour2[1]) - parseInt(hour1[1])
    const diff = (diffHour * 60) + diffMinutes
    return negative ? diff : Math.abs(diff)
}

/**
 * Não modifica o json original
 * 
 * @param {json} json a ser clonado
 * @returns {json} cópia do json
 */
const cloneJSON = json => JSON.parse(JSON.stringify(json))

const replaceKeyJson = (json, key, newKey) => {
    const result = cloneJSON(json)
    result[newKey] = result[key]
    delete result[key]
    return result
}

const fillZeros = (length, value) => '0'.repeat(length - value.length) + value

const dateToString = (date, format = 'yyyy-mm-dd') => {
    const y = date.getFullYear().toString()
    const m = (date.getMonth() + 1).toString() // january is 0
    const d = date.getDate().toString()

    return format.replace('yyyy', y).replace('mm', fillZeros(2, m)).replace('dd', fillZeros(2, d))
}

const getWeekdayName = date => {
    if( !(date instanceof Date) ){
        throw `Valor inesperado, esperado: Date\nRecebido: ${typeof date}`
    }
    const keys = Object.keys(Weekday)
    for (key of keys){
        if (Weekday[key] === date.getDay())
            return key
    }
}

exports.fillZeros = fillZeros
exports.dateToString = dateToString
exports.formatDate = formatDate
exports.stringToBool = stringToBool
exports.formatDateResolve = formatDateResolve
exports.minutesDiff = minutesDiff
exports.cloneJSON = cloneJSON
exports.replaceKeyJson = replaceKeyJson
exports.getWeekdayName = getWeekdayName