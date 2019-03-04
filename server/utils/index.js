const formatDate = date => {
    const resp = date.split('/')
    return `${resp[2]}-${resp[1]}-${resp[0]}`
}

const stringToBool = value => value.toUpperCase() === 'TRUE' 

const formatDateResolve = date => {
    if (date.indexOf('-') !== -1){ // correct format
        return date
    }else{
        return formatDate(date)
    }
}

exports.formatDate = formatDate
exports.stringToBool = stringToBool
exports.formatDateResolve = formatDateResolve