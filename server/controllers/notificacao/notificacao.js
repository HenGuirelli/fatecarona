const { buscarNotificacaoDAO } = require('../../DAO/DAO')

function buscarNotificacao(email, resultado){
    return buscarNotificacaoDAO(email, resultado)
}

exports.buscarNotificacao = buscarNotificacao