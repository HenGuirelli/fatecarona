const formatDate = date => {
    const resp = date.split('/')
    return `${resp[2]}-${resp[1]}-${resp[0]}`
}

exports.formatDate = formatDate