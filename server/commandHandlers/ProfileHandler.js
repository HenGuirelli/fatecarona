const { UpdateMembros, InsertCar, InsertFlow } = require('../DAO/mysql')
const { IsValidEmailForUpdate, IsValidCar, EmailExists, GetFlowNumRows } = require('../DAO/mysql')
const { replaceKeyJson } = require('../utils')
const { Sync, Operation, action, actionDestination } = require('../services/sync')

const sync = Sync.getInstance()

const fetchJsonToMongo = json => {
    json = replaceKeyJson(json, '_expirationDate', 'expirationDate')
    json = replaceKeyJson(json, '_typeCNH', 'typeCNH')
    return json
}

class ProfileHandler {
    static insertCarInformation(insertCarInformationCommand) {
        const val = {
            placa: insertCarInformationCommand.plate,
            email: insertCarInformationCommand.email,
            marca: insertCarInformationCommand.brand,
            modelo: insertCarInformationCommand.model,
            cor: insertCarInformationCommand.color
        }

        if (!EmailExists(val.email)){
            return { success: false, message: `Email ${val.email} inválido` }
        }

        if (!IsValidCar(val.placa)){
            return { success: false, message: `Carro inválido: placa já cadastrada` }
        }
        
        InsertCar(val)
        sync.add(new Operation({ action: action.INSERT, values: { ...insertCarInformationCommand } }), actionDestination.CAR)
        return { success: true }
    }

    static insertDriverInformation(insertDriverInformationCommand) {
        const email = insertDriverInformationCommand.email

        const val = {
            motorista: insertDriverInformationCommand.isDriver,
            cnh: insertDriverInformationCommand.CNH,
            categoriaCNH: insertDriverInformationCommand.typeCNH,
            validadeCNH: insertDriverInformationCommand.expirationDate,
        }

        if (IsValidEmailForUpdate(email)){
            UpdateMembros(val, email) 
            sync.add(new Operation({ action: action.UPDATE, where: { email }, values: { ...insertDriverInformationCommand } }), actionDestination.PROFILE)
            return { success: true }
        }else{
            return { success: false, message: `Email ${email} inválido` }
        }
    }

    static insertFlowInformation(insertFlowInformation) {
        const id = GetFlowNumRows() + 3 // só para não ficar sequencial
        const val = {
            nome: insertFlowInformation.name,
            origem: insertFlowInformation.origin,
            destino: insertFlowInformation.destination,
            email: insertFlowInformation.email,
            id,
            pontos_interesse: insertFlowInformation.waypoints,
        }
        
        if (!EmailExists(val.email)){
            return { success: false, message: `Email ${val.email} inválido` }
        }
        
        InsertFlow(val)
        sync.add(new Operation({ action: action.INSERT, values: { ...insertFlowInformation, id }}), actionDestination.FLOW)
        return { success: true }

    }

    static insertPersonalData(insertPersonalDataCommand) {
        const email = insertPersonalDataCommand.email

        const val = {
            apelido: insertPersonalDataCommand.nick,
            chegada: insertPersonalDataCommand.inFatec,
            saida: insertPersonalDataCommand.outFatec,
            telefone: insertPersonalDataCommand.phone,
        }

        if (IsValidEmailForUpdate(email)){
            UpdateMembros(val, email)
            sync.add(new Operation({ action: action.UPDATE, where: { email } , values: { ...insertPersonalDataCommand }}), actionDestination.PROFILE)
            return { success: true }
        }else{
            return { success: false, message: `Email ${email} inválido` }
        }
    }

    static updateProfileData(updateProfileDataCommand) {
        const email = updateProfileDataCommand.email

        const val = {
            apelido: updateProfileDataCommand.nick,
            chegada: updateProfileDataCommand.inFatec,
            saida: updateProfileDataCommand.outFatec,
            telefone: updateProfileDataCommand.phone,
            motorista: updateProfileDataCommand.isDriver,
            cnh: updateProfileDataCommand.CNH,
            categoriaCNH: updateProfileDataCommand.typeCNH,
            validadeCNH: updateProfileDataCommand.expirationDate
        }

        if (IsValidEmailForUpdate(email)){
            UpdateMembros(val, email)

            sync.add(new Operation({ action: action.UPDATE, 
                where: { email },
                values: fetchJsonToMongo({ ...updateProfileDataCommand })
            }), actionDestination.PROFILE)

            return { success: true }
        }else{
            return { success: false, message: `Email ${email} inválido` }
        }

    }
}

exports.ProfileHandler = ProfileHandler