class RateUserCommand {
    constructor({ raterEmail, ratedEmail, stars, comment }){
        this.raterEmail = raterEmail
        this.ratedEmail = ratedEmail
        this.stars = stars
        this.comment = comment

        
        if (comment.length > 50){
            throw `Comentário muito longo`
        }

        if (stars > 5){
            throw `Valor de estrela muito alto\nLimite: 5`
        }
    }
}

exports.RateUserCommand = RateUserCommand