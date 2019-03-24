const { InsertInMembros, IsValidEmailForInsert } = require('../DAO/mysql')
const { Sync, Operation, action, actionDestination } = require('../DAO/sync')
const { replaceKeyJson }  = require('../utils')

const sync = Sync.getInstance()

class AccessHandler {
    static createNewMember(createNewMemberCommand) {
        const val = {
            email: createNewMemberCommand.email,
            nome: createNewMemberCommand.name
        }

        try {
            if (IsValidEmailForInsert(val.email)) {
                InsertInMembros(val)
                sync.add(new Operation({ 
                    action: action.INSERT, 
                    values: replaceKeyJson({ ...createNewMemberCommand }, '_email', 'email')
                }), actionDestination.PROFILE)
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