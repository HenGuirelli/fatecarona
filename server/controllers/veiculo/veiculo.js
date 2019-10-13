const { inserirVeiculo, deletarVeiculoDAO, buscarVeiculoDAO } = require('../../DAO/DAO')

function criarVeiculo(veiculo, onSucesso, onFalha) {
    inserirVeiculo(veiculo, onSucesso, onFalha)
}

function deletarVeiculo(veiculo, onResultado) {
    deletarVeiculoDAO(veiculo, onResultado)
}

function buscarVeiculo(veiculo, onResultado) {
    buscarVeiculoDAO(veiculo, onResultado)
}

exports.criarVeiculo = criarVeiculo
exports.buscarVeiculo = buscarVeiculo
exports.deletarVeiculo = deletarVeiculo