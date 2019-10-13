const { inserirTrajetoDAO, excluirTrajetoDAO, buscarTrajetoDAO } = require('../../DAO/DAO')

function inserirTrajeto(trajeto, resultado){
    inserirTrajetoDAO(trajeto, resultado)
}

function excluirTrajeto(trajeto, resultado){
    excluirTrajetoDAO(trajeto, resultado)
}

function buscarTrajeto(trajeto, resultado){
    buscarTrajetoDAO(trajeto, resultado)
}

exports.inserirTrajeto = inserirTrajeto
exports.excluirTrajeto = excluirTrajeto
exports.buscarTrajeto = buscarTrajeto