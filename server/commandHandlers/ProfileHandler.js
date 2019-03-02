const { UpdateMembros } = require('../DAO/mysql')
const { IsValidEmailForUpdate } = require('../DAO/mysql')

class ProfileHandler {
    static insertCarInformation(insertCarInformationCommand) {

    }

    static insertDriverInformation(insertDriverInformationCommand) {

    }

    static insertFlowInformation(InsertFlowInformationCommand) {

    }

    static insertPersonalData(insertPersonalDataCommand) {

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
            return { success: true }
        }else{
            return { success: false, message: `Email ${email} inválido` }
        }

    }
}

exports.ProfileHandler = ProfileHandler