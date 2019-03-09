const intitutionalEmail = '@fatec.sp.gov.br'

class CreateNewMemberCommand {
    constructor(email, senha){
        this.name = senha
        this._email = email.replace(intitutionalEmail, '')
    }

    set email(val) {
        this._email = val.replace(intitutionalEmail, '')
    }

    get email(){
        return this._email
    }
}

exports.CreateNewMemberCommand = CreateNewMemberCommand