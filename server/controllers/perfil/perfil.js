const { atualizarDadosPerfil, buscarPerfilDAO } = require('../../DAO/DAO')

function atualizarPerfil(perfil, onSucesso, onFalha) {
    atualizarDadosPerfil(perfil, onSucesso, onFalha)
}

function buscarPerfil(perfil, resultado) {
    buscarPerfilDAO(perfil, resultado)
}

exports.atualizarPerfil = atualizarPerfil
exports.buscarPerfil = buscarPerfil