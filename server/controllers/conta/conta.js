const { inserirNovaConta, buscarConta }  = require('../../DAO/DAO') 
const { criptografar } = require('../criptografia')

async function criarConta(usuario, onSucesso, onReject) {
    return await inserirNovaConta(usuario.email, criptografar(usuario.senha), onSucesso, onReject)
}

async function logar(usuario, onTerminar) {
    return await buscarConta(usuario.email, criptografar(usuario.senha), onTerminar)
}

exports.criarConta = criarConta
exports.logar = logar