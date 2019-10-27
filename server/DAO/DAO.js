const mysql = require('mysql')

const connectionConfig = {
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'bob@123',
    database : 'fatecarona2'
}

const connection = mysql.createConnection(connectionConfig)

connection.connect(err =>{
    if(err) return console.log(err);
    console.log('conectou!');
})

async function inserirNovaConta(email, senha, onSucesso, onReject){
    return await connection.query(`insert into contas(email, senha) values ('${email}', '${senha}')`, (error, results, fields) => {
        if (error){
            onReject()
        }else{
            onSucesso()
        }
    })
}

async function buscarConta(email, senha, onTerminar) {
    return connection.query(`select * from contas where email = '${email}' and senha = '${senha}'`, (error, results, fields) => {
        if (error || results.length == 0){
            onTerminar({ sucesso: false })
        }else{
            onTerminar({ sucesso: true })
        }
    })
}

async function buscarPerfilDAO(perfil, resultado) {
    const query = `
    select
        *
    from 
        contas
    where
        email = '${perfil.email}'`

    return connection.query(query, (error, results, fields) => {
        if (error){
            resultado({ sucesso: false, resultado: [] })
        }else{
            resultado({ 
                sucesso: true, 
                resultado: removerSenhasDoPerfil (results)
            })
        }
    })
}

function removerSenhasDoPerfil(vetorPerfil) {
    return vetorPerfil.map(element => {
        return removerSenha(element)
    })
}

function removerSenha(perfil){
    const { senha, ...result } = perfil
    return result
}

async function atualizarDadosPerfil(perfil, onSucesso, onFalha) {
    const query = removerUndefined(`
    update 
        contas 
    set 
        nome = '${perfil.nome}',
        telefone = '${perfil.telefone}',
        apelido = '${perfil.apelido}',
        img = '${perfil.img}',
        chegada = '${perfil.chegada}',
        saida = '${perfil.saida}',
        motorista = ${perfil.motorista},
        cnh = '${perfil.cnh}',
        validadeCNH = '${perfil.validadeCNH}',
        categoriaCNH = '${perfil.categoriaCNH}'
    where
        email = '${perfil.email}'
    `)
    
    return connection.query(query, (error, results, fields) => {
        if (error){
            onFalha({ sucesso: false })
        }else{
            onSucesso({ sucesso: true })
        }
    })
}

function removerUndefined(query){
    return query.replace(/'undefined'/g, 'null').replace(/undefined/g, 0)
}

async function inserirVeiculo(veiculo, onSucesso, onFalha) {
    return connection.query(`
    insert into 
        veiculos(placa, email, marca, modelo, cor) 
    values
        (
            '${veiculo.placa}', 
            '${veiculo.email}', 
            '${veiculo.marca}', 
            '${veiculo.modelo}', 
            '${veiculo.cor}'
        )`, (error, results, fields) => {
        if (error){
            onFalha({ sucesso: false })
        }else{
            onSucesso({ sucesso: true })
        }
    })
}

async function deletarVeiculoDAO(veiculo, resultado) {
    return connection.query(`
        delete from
            veiculos
        where 
            placa = '${veiculo.placa}'
        `, (error, results, fields) => {
            if (error){
                resultado({ sucesso: false })
            }else{
                resultado({ sucesso: true })
            }
        })
}

async function buscarVeiculoDAO(veiculo, resultado) {
    return connection.query(`
        select
            *
        from
            veiculos
        where
            email = '${veiculo.email}'
        `, (error, results, fields) => {
            if (error){
                resultado({ sucesso: false, resultado: [] })
            }else{
                resultado({ sucesso: true, resultado: results })
            }
        })
}

async function inserirTrajetoDAO(trajeto, resultado) {
    const pontosInteresse = trajeto.pontos_de_interesse
    const query = `
    insert into 
        trajetos(
            email,
            nome,
            origem,
            destino
        )
    values (
        '${trajeto.email}',
        '${trajeto.nome}',
        '${trajeto.origem}',
        '${trajeto.destino}'
    )`
    connection.query(query, (err, results, fields) => {
        if (err){
            resultado({ sucesso: false })
        }
    })

    if (pontosInteresse && pontosInteresse.length == 0) {
        resultado({ sucesso: true })
        return
    }

    connection.query(`select id from trajetos order by id desc`, (err, results, fields) => {
        const id_trajeto = results && results[0]["id"]
        pontosInteresse && pontosInteresse.forEach(local => {
            const query = `
            insert into 
                pontos_de_interesse (id_trajeto, local)
            values
                (${id_trajeto}, '${local}' )
        `
            connection.query(query, (err, results, fields) => {
            })
        })
        resultado({ sucesso: true })
    })
}


async function excluirTrajetoDAO(trajeto, result){
    connection.query(`delete from trajetos where id = ${trajeto.id}`,
    (err, results, fields) => {
        if(err){
            result({ sucesso: false })
        }else{
            result({ sucesso: true })
        }
    })
}  

async function buscarTrajetoDAO(trajeto, resultado){
    connection.query(`select * from trajetos where email = '${trajeto.email}'`,
    (err, results, fields) => {
        if(err){
            resultado({ sucesso: false, resultado: [] })
        }else{
            results.forEach(item => {
                connection.query(`select * from pontos_de_interesse where id_trajeto = ${item.id}`,
                (err, results, fields) => {
                    if (err) {
                        resultado({ sucesso: false, resultado: [] })
                    }else {
                        item.pontosInteresse = results
                    }
                })
            })
            // aguarda a execução do trecho de cima
            setTimeout(() => {                    
                resultado({ sucesso: true, resultado: results })
            }, 300);
        }
    })
}

async function inserirNovaCaronaDAO(carona, resultado){
    connection.query(`insert into caronas (
        motorista,
        veiculo,
        trajeto,
        data,
        hora,
        destino,
        permitido_fumar,
        permitido_musica_alta,
        permitido_cadeira_rodas
    )
    VALUES(
        '${carona.motorista}',
        '${carona.veiculo}',
        ${carona.trajeto},
        '${carona.data}',
        '${carona.hora}',
        '${carona.destino}',
        ${carona.permitido_fumar},
        ${carona.permitido_musica_alta},
        ${carona.permitido_cadeira_rodas}
    )`, (err, results, fields) => {
        if (err){
            resultado({ sucesso: false })
        }
        else {
            resultado({ sucesso: true })
        }
    })
}

async function buscarCaronaDAO(carona, resultado) {
    connection.query(`
    SELECT 
        * 
    FROM 
        caronas 
    WHERE
        motorista = '${carona.email}'
        AND eh_semanal = false
        AND FINALIZADA = false`, 
    (err, result, fields) => {
        if (err){
            resultado({ sucesse: false, resultado: [] })
        }else {
            resultado({ sucesso: true, resultado: result })
        }
    })
}

async function inserirNovaCaronaSemanalDAO(carona, resultado) {
    connection.query(`insert into caronas (
        motorista,
        veiculo,
        trajeto,
        hora,
        destino,
        permitido_fumar,
        permitido_musica_alta,
        permitido_cadeira_rodas,
        segunda,
        terca,
        quarta,
        quinta,
        sexta,
        sabado,
        domingo,
        eh_semanal
    )
    VALUES(
        '${carona.motorista}',
        '${carona.veiculo}',
        ${carona.trajeto},
        '${carona.hora}',
        '${carona.destino}',
        ${carona.permitido_fumar},
        ${carona.permitido_musica_alta},
        ${carona.permitido_cadeira_rodas},
        ${carona.segunda},
        ${carona.terca},
        ${carona.quarta},
        ${carona.quinta},
        ${carona.sexta},
        ${carona.sabado},
        ${carona.domingo},
        true
    )`, (err, results, fields) => {
        if (err){
            resultado({ sucesso: false })
        }
        else {
            resultado({ sucesso: true })
        }
    })
}

async function buscarCaronaSemanalDAO(carona, resultado){
    connection.query(`
        SELECT 
            * 
        FROM 
            caronas 
        WHERE 
            motorista = '${carona.email}'
        AND eh_semanal = true
        AND FINALIZADA = false`,
    (err, results, fields) =>{
        if(err){
            resultado({ sucesso: false, resultado: [] })
        }else {
            resultado({ sucesso: true, resultado: results })
        }
    })
}

async function deletarCaronaDAO(carona, resultado) {
    connection.query(`DELETE FROM caronas where caronas.id = ${carona.id}`,
    (err, results, fields) => {
        if (err) {
            resultado({ sucesso: false })
        }
        else {
            resultado({ sucesso: true })
        }
    })
}

async function buscarTodasCaronasDAO(carona, resultado) {
    connection.query(`
        SELECT
            *
        FROM
            CARONAS
        WHERE
            MOTORISTA = '${carona.motorista}'`,
    (err, results, fields) => {
        if (err){
            resultado({ sucesso: false, resultado: [] })
        }else {
            resultado({ sucesso: true, resultado: results })
        }
    })
}

async function pedirCaronaDAO(carona, resultado) {
    connection.query(`
        INSERT INTO 
            pedidos_carona(
                ID_CARONA,
                EMAIL_PASSAGEIRO
            )
        VALUES (
            ${carona.id},
            '${carona.email}'
        )
    `, (err, result, fields) => {
        if (err){
            resultado({ sucesso: false })
        }else {
            resultado({ sucesso: true })
        }
    })
}

async function filtrarCaronasDAO(resultado) {
    connection.query(`
        SELECT
            *
        FROM
            caronas
    `, (err, results, fields) => {
        if(err){
            resultado(results)
        }else {
            resultado(results)
        }
    })
}

async function aceitarPedidoDeCaronaDAO(carona, resultado){
    connection.query(`CALL ACEITAR_PEDIDO_CARONA(${carona.id}, '${carona.email_passageiro}')`,
    (err, results, fields) => {
        if (err){
            resultado({ sucesso: false })
        }else {
            resultado({ sucesso: true })
        }
    })
}

async function finalizarCaronaDAO(carona, resultado) {
    connection.query(`
        UPDATE 
            CARONAS 
        SET 
            FINALIZADA = 1 
        WHERE ID = ${carona.id}`, 
        (err, results, fields) => {
            if (err){
                resultado({ sucesso: false, err })
            }else {
                resultado({ sucesso: true })
            }
        })
}

async function buscarVeiculoPelaPlacaDAO(veiculo, resultado) {
    connection.query(`SELECT * FROM VEICULOS WHERE PLACA = '${veiculo.placa}'`, (err, result, fields) => {
        if (err){
            resultado({ sucesso: false, err})
        }else {
            resultado({ sucesso: true, result})
        }
    })
}

async function buscarNotificacaoDAO(email, resultado){
    connection.query(`
    SELECT 
        * 
    FROM 
        PEDIDOS_CARONA PC 
    INNER JOIN 
        CARONAS C 
    ON 
        PC.ID_CARONA = C.ID
    WHERE
        MOTORISTA = '${email}'`, (err, result, fields) => {
            if(err){
                resultado({ sucesso: false, err })
            }else {
                resultado({ sucesso: true, resultado: result })
            }
    })
}

exports.inserirNovaConta = inserirNovaConta
exports.buscarConta = buscarConta
exports.atualizarDadosPerfil = atualizarDadosPerfil
exports.buscarPerfilDAO = buscarPerfilDAO
exports.inserirVeiculo = inserirVeiculo
exports.deletarVeiculoDAO = deletarVeiculoDAO
exports.buscarVeiculoDAO = buscarVeiculoDAO
exports.inserirTrajetoDAO = inserirTrajetoDAO
exports.excluirTrajetoDAO = excluirTrajetoDAO
exports.buscarTrajetoDAO = buscarTrajetoDAO
exports.inserirNovaCaronaDAO = inserirNovaCaronaDAO
exports.buscarCaronaDAO = buscarCaronaDAO
exports.inserirNovaCaronaSemanalDAO = inserirNovaCaronaSemanalDAO
exports.buscarCaronaSemanalDAO = buscarCaronaSemanalDAO
exports.deletarCaronaDAO = deletarCaronaDAO
exports.buscarTodasCaronasDAO = buscarTodasCaronasDAO
exports.pedirCaronaDAO = pedirCaronaDAO
exports.filtrarCaronasDAO = filtrarCaronasDAO
exports.aceitarPedidoDeCaronaDAO = aceitarPedidoDeCaronaDAO
exports.finalizarCaronaDAO = finalizarCaronaDAO
exports.buscarVeiculoPelaPlacaDAO = buscarVeiculoPelaPlacaDAO
exports.buscarNotificacaoDAO = buscarNotificacaoDAO
