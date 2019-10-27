const { inserirNovaConta, buscarConta }  = require('../../DAO/DAO') 
const { criptografar } = require('../criptografia')

async function criarConta(usuario, onSucesso, onReject) {
    return await inserirNovaConta(usuario.email, criptografar(usuario.senha), onSucesso, onReject)
}

async function logar(usuario, onTerminar) {
    const senhaCriptografada = await criptografar(usuario.senha)
    return await buscarConta(usuario.email, senhaCriptografada, onTerminar)
}

exports.criarConta = criarConta
exports.logar = logar