const { inserirVeiculo, deletarVeiculoDAO, buscarVeiculoDAO, buscarVeiculoPelaPlacaDAO } = require('../../DAO/DAO')

function criarVeiculo(veiculo, onSucesso, onFalha) {
    inserirVeiculo(veiculo, onSucesso, onFalha)
}

function deletarVeiculo(veiculo, onResultado) {
    deletarVeiculoDAO(veiculo, onResultado)
}

function buscarVeiculo(veiculo, onResultado) {
    buscarVeiculoDAO(veiculo, onResultado)
}

function buscarVeiculoPelaPlaca(veiculo, onResultado) {
    buscarVeiculoPelaPlacaDAO(veiculo, onResultado)
}

exports.criarVeiculo = criarVeiculo
exports.buscarVeiculo = buscarVeiculo
exports.deletarVeiculo = deletarVeiculo
exports.buscarVeiculoPelaPlaca = buscarVeiculoPelaPlaca