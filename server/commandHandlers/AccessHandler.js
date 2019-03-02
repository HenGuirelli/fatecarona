const { InsertInMembros, IsValidEmailForInsert } = require('../DAO/mysql')

class AccessHandler {
    static createNewMember(createNewMemberCommand) {
        const val = {
            email: createNewMemberCommand.email,
            nome: createNewMemberCommand.name
        }

        try {
            if (IsValidEmailForInsert(val.email)) {
                InsertInMembros(val)
                return { success: true }
            }
            throw 'Email já cadastrado'
        }catch (e) {
            return { success: false, message: e }
        }
    }

    static getMemberInformation (getMemberInformationCommand) {

    }
}

exports.AccessHandler = AccessHandler