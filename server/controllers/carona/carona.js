const { 
    inserirNovaCaronaDAO, 
    inserirNovaCaronaSemanalDAO,
    buscarCaronaDAO,
    buscarCaronaSemanalDAO,
    deletarCaronaDAO,
    buscarTodasCaronasDAO,
    pedirCaronaDAO,
    filtrarCaronasDAO,
    aceitarPedidoDeCaronaDAO,
    finalizarCaronaDAO
} = require('../../DAO/DAO')

function inserirNovaCarona(carona, resultado) {
    inserirNovaCaronaDAO(carona, resultado)
}

function inserirNovaCaronaSemanal(carona, resultado) {
    inserirNovaCaronaSemanalDAO(carona, resultado)
}

function buscarCarona(carona, resultado){
    buscarCaronaDAO(carona, resultado)
}

function buscarCaronaSemanal(carona, resultado) {
    buscarCaronaSemanalDAO(carona, resultado)
}

function deletarCarona(carona, resultado) {
    deletarCaronaDAO(carona, resultado)
}

function buscarTodasCaronas(carona, resultado){
    buscarTodasCaronasDAO(carona, resultado)
}

function pedirCarona(carona, resultado){
    pedirCaronaDAO(carona, resultado)
}

function filtrarCaronas(carona, resultado){
    filtrarCaronasDAO(resultadoBD => {
        const caronasFiltradas = resultadoBD.filter(x => {
            if (carona.eh_semanal === "true"){
                return filtrarSemanal(x, carona)
            }else{
                return filtrarCaronaMarcada(x, carona)
            }
        })
        resultado(caronasFiltradas)
    })
}

function filtrarSemanal(caronaBD, carona){
    if (!caronaBD.eh_semanal) return false
    return caronaBD.hora == carona.hora
}

function filtrarCaronaMarcada(caronaBD, carona){
    if (caronaBD.eh_semanal) return false
    const dia = preencherEsquerda(`${caronaBD.data.getDate()}`, "0", 2)
    const mes = preencherEsquerda(`${caronaBD.data.getMonth() + 1}`, "0", 2)
    const ano = caronaBD.data.getFullYear()
    const dataFormatada = `${ano}-${mes}-${dia}`
    return dataFormatada == carona.data
}

function preencherEsquerda(val, char, qtd){
    let chars = ""
    for(var i = val.length; i < qtd; i++){
        chars += char
    }
    return chars + val
}

function getDiaDaSemana(data){
    const days = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
    return days[data.getDay()]
}

const minutesDiff = (val1, val2, negative = true) => {
    const hour1 = val1.split(':')
    const hour2 = val2.split(':')
    const diffHour = parseInt(hour2[0]) - parseInt(hour1[0])
    const diffMinutes = parseInt(hour2[1]) - parseInt(hour1[1])
    const diff = (diffHour * 60) + diffMinutes
    return negative ? diff : Math.abs(diff)
}

function aceitarPedidoDeCarona(carona, resultado) {
    return aceitarPedidoDeCaronaDAO(carona, resultado)
}

function finalizarCarona(carona, resultado) {
    return finalizarCaronaDAO(carona, resultado)
}

exports.inserirNovaCarona = inserirNovaCarona
exports.inserirNovaCaronaSemanal = inserirNovaCaronaSemanal
exports.buscarCarona = buscarCarona
exports.buscarCaronaSemanal = buscarCaronaSemanal
exports.deletarCarona = deletarCarona
exports.buscarTodasCaronas = buscarTodasCaronas
exports.pedirCarona = pedirCarona
exports.filtrarCaronas = filtrarCaronas
exports.aceitarPedidoDeCarona = aceitarPedidoDeCarona
exports.finalizarCarona = finalizarCarona